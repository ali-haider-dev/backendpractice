import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send-email.js";

const REMINDERS = [7, 5, 3, 1]; // days before renewal date to send reminders
export const sendReminders = serve(async (context) => {
  console.log("Running sendReminders workflow");
  const { subscriptionId } = context.requestPayload;
  const subscription  = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== 'active') return;

  const renewalDate = dayjs(subscription.renewalDate);
  console.log(
    `Renewal date for subscription ${subscriptionId} is ${renewalDate.toISOString()}`
  );
  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription  ${subscriptionId}.stopping workflows.`
    );
    return;
  }
  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntillReminder(
        context,
        `Reminders ${daysBefore} days before`,
        reminderDate
      );
    }
    await triggerReminder(context, `${daysBefore} days before reminder`,subscription);
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "email name");
  });
};
const sleepUntillReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date.toISOString()}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label,subscription) => {
  return await context.run(label,async () => {
    console.log(`Triggering ${label} reminder`);
    await sendReminderEmail({
        to:subscription.user.email,
        type:label,
        subscription,
    })
  });
};

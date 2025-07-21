import { Router } from "express";
import { authorize } from "../middlewere/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const SubscriptionRouter = Router();

SubscriptionRouter.get("/", (req, res) => {
  res.send("gett all subscriptions");
});
SubscriptionRouter.get("/:id", (req, res) => {
  const subscriptionId = req.params.id;
  res.send(`Get subscription with ID: ${subscriptionId}`);
});
SubscriptionRouter.post("/", authorize, createSubscription);

SubscriptionRouter.put("/:id", (req, res) => {
  const subscriptionId = req.params.id;
  // Here you would typically update the subscription in a database
  res.send(`Update subscription with ID: ${subscriptionId}`);
});

SubscriptionRouter.delete("/:id", (req, res) => {
  const subscriptionId = req.params.id;
  res.send(`Delete subscription with ID: ${subscriptionId}`);
});
SubscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
SubscriptionRouter.put("/:id/cancel", (req, res) => {
  const userId = req.params.id;
  // Here you would typically update the user's subscription in a database
  res.send(`cancel subscription for user with ID: ${userId}`);
});

SubscriptionRouter.get("/upcomingRenewal", (req, res) => {
  // Here you would typically fetch upcoming subscriptions from a database
  res.send("Get all upcoming subscriptions for renewal");
});

export default SubscriptionRouter;

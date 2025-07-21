import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "Content-Type": "application/json",
      },
      retries: 0,
    });
    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: { subscription, workflowRunId },
    });
  } catch (e) {
    next(e);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id.toString()) {
      // console.log(req.user._id.toString(), req.params.id.toString());
      const error = new Error(
        "You are not authorized to view this user's subscriptions"
      );
      error.statusCode = 403;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });
    if (!subscriptions || subscriptions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subscriptions found for this user",
      });
    }
    res.status(200).json({
      success: true,
      data: subscriptions,
      message: "User subscriptions retrieved successfully",
    });
  } catch (e) {
    next(e);
  }
};

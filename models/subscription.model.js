import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["USD", "EUR", "GBP", "INR"], // Add more currencies as needed
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["monthly", "yearly"], // Add more frequencies as needed
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "technology",
        "finance",
        "others",
      ], // Add more categories as needed
      required: [true, "Subscription category is required"],
    },
    paymentMethod: {
      type: String,
      trim: true,
      required: [true, "Payment method is required"],
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Start date cannot be in the future",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate.toISOString());
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }
  //auto update status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});
const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
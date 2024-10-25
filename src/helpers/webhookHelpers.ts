import User from "../models/userModel";
const paystack = require("paystack-api")(process.env.PAYSTACK_SECRET_KEY);

type webHookTransfer = {
  data: {
    email: string;
    reference: string;
    amount: number;
    status: string,
    plan: {
      name: string;
    };
  };
};

export async function chargeSuccess(data: webHookTransfer) {
  try {
    const output = data.data;
    const reference = output.reference;

    const user = await User.findOne({ paystack_ref: reference });
    const userId = user?._id;
    console.log("Updating charge status");

    if (user?.paystack_ref == "success") {
      return {
        data: {},
        message: "Transaction has been verified",
        status: 1,
      };
    }
    const response = await paystack.transaction.verify({
      reference: user?.paystack_ref,
    });

    if (response.data.status == "success") {
      const data = {
        paystack_ref: response.data.status,
        amountDonated: output.amount,
      };
      await User.findOneAndUpdate(userId, data);
      console.log("Charge Successful");
    } else {
      console.log("Charge Unsuccessful");
    }
  } catch (err: any) {
    console.log({ data: {}, error: `${err.message}`, status: 1 });
  }
}

export async function planChargeSuccess(data: webHookTransfer) {
  try {
    const output = data.data;
    const reference = output.reference;

    const user = await User.findOne({ paystack_ref: reference });
    const userId = user?._id;

    console.log("Updating charge status");

    // subscribe for user
    if (user?.paystack_ref == "success")
      return {
        data: {},
        message: "Transaction has been verified",
        status: 1,
      };

    const response = await paystack.transaction.verify({
      reference: user?.paystack_ref,
    });

    if (response.data.status == "success") {
      await User.findByIdAndUpdate(userId, {
        isSubscribed: true,
        paystack_ref: response.data.status,
        planName: output.plan.name,
        timeSubscribed: response.data.paid_at,
      });
      console.log("Charge Successful");
    } else {
      console.log("Charge Unsuccessful");
    }
  } catch (err: any) {
    console.log({ data: {}, error: `${err.message}`, status: 1 });
  }
}

// invoicePaymentFailed
export async function cancelSubscriptio(data: webHookTransfer) {
  try {
    const output = data.data;
    const reference = output.reference;

    const user = await User.findOne({ paystack_ref: reference });
    const userId = user?._id;

    console.log("Cancelling subscription...");

    const response = await paystack.transaction.verify({
      reference: user?.paystack_ref,
    });

    await User.findByIdAndUpdate(userId, {
      isSubscribed: true,
      paystack_ref: response.data.status,
      planName: "cancelled",
    });
    console.log("User Subscription Cancelled");
  } catch (err: any) {
    console.log({ data: {}, error: `${err.message}`, status: 1 });
  }
}

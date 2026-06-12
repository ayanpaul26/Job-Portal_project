import { Webhook } from "svix";
import User from "../models/User.js";

// API controller function to manage Clerk users with database
export const clerkWebhooks = async (req, res) => {
  try {
    console.log("Webhook received");

    // Get data from request body
    const { data, type } = req.body;

    console.log("Type:", type);

    // Create Svix instance
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify webhook signature
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: data.email_addresses?.[0]?.email_address,
          image: data.image_url,
          resume: "",
        };

        await User.create(userData);

        console.log("User created:", data.id);

        return res.status(200).json({
          success: true,
        });
      }

      case "user.updated": {
        const userData = {
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: data.email_addresses?.[0]?.email_address,
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);

        console.log("User updated:", data.id);

        return res.status(200).json({
          success: true,
        });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);

        console.log("User deleted:", data.id);

        return res.status(200).json({
          success: true,
        });
      }

      default:
        return res.status(200).json({
          success: true,
          message: "Event ignored",
        });
    }
  } catch (error) {
    console.error("Webhook Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

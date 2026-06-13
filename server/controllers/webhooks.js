import { Webhook } from "svix";
import User from "../models/User.js";

// API controller function to manage Clerk users with database
export const clerkWebhooks = async (req, res) => {
  try {
    // console.log("Webhook received");

    // Create Svix instance
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // const payload = Buffer.isBuffer(req.body)
    //   ? req.body.toString("utf8")
    //   : JSON.stringify(req.body);

    // Verify webhook signature
    // const event = whook.verify(payload, {
    //   "svix-id": req.headers["svix-id"],
    //   "svix-timestamp": req.headers["svix-timestamp"],
    //   "svix-signature": req.headers["svix-signature"],
    // });
     await whook.verify(JSON.string, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;
      switch (type) {
          case 'user.created':{

            const userData ={
             _id: data.id,
              email: data.email_addresses[0].email_address,
              name : data.first_name+" "+ data.last_name,
              image: data.image_url,
              resume:''
    }
   await User.create(userData)
   req.json({})
   break;
  }
     case 'user.updated':{
  const userData ={
              email: data.email_addresses[0].email_address,
              name : data.first_name+" "+ data.last_name,
              image: data.image_url,
    }
   await User.findByIdAndUpdate(data.id, userData)
   req.json({})
   break;
  }
   case 'user.deleted':{
    await User.findByIdAndDelete(data.id)
     req.json({})
   break;
  }
  default:
    break;
   
}
  }

 catch (error) {
    console.log(error.message);
    res.json({success:false, message:'Webhooks Error'})
 }

};


    // console.log("Type:", type);

    // const primaryEmail =
    //   data.email_addresses?.find(
    //     (email) => email.id === data.primary_email_address_id
    //   )?.email_address || data.email_addresses?.[0]?.email_address;

    // const displayName =
    //   `${data.first_name || ""} ${data.last_name || ""}`.trim() ||
    //   data.username ||
    //   primaryEmail?.split("@")[0] ||
    //   "User";

  //   switch (type) {
  //     case "user.created": {
  //       const userData = {
  //         name: displayName,
  //         email: primaryEmail,
  //         image: data.image_url || "",
  //       };

  //       await User.findByIdAndUpdate(data.id, {
  //         $set: userData,
  //         $setOnInsert: { resume: "" },
  //       }, {
  //         upsert: true,
  //         new: true,
  //         runValidators: true,
  //         setDefaultsOnInsert: true,
  //       });

  //       console.log("User created:", data.id);

  //       return res.status(200).json({
  //         success: true,
  //       });
  //     }

  //     case "user.updated": {
  //       const userData = {
  //         name: displayName,
  //         email: primaryEmail,
  //         image: data.image_url || "",
  //       };

  //       await User.findByIdAndUpdate(data.id, userData, {
  //         upsert: true,
  //         new: true,
  //         runValidators: true,
  //         setDefaultsOnInsert: true,
  //       });

  //       console.log("User updated:", data.id);

  //       return res.status(200).json({
  //         success: true,
  //       });
  //     }

  //     case "user.deleted": {
  //       await User.findByIdAndDelete(data.id);

  //       console.log("User deleted:", data.id);

  //       return res.status(200).json({
  //         success: true,
  //       });
  //     }

  //     default:
  //       return res.status(200).json({
  //         success: true,
  //         message: "Event ignored",
  //       });
  //   }
  // } catch (error) {
  //   console.error("Webhook Error:", error);

  //   return res.status(500).json({
  //     success: false,
  //     message: error.message,
  //   });
  

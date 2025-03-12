import { NextResponse } from "next/server";
import webpush from "web-push";

const PUBLIC_VAPID_KEY = "BOamQs4uzigQ5TLMa-PtBX0Roiqa0JRR8OHakjZvNU38Iu-6HtXW2ZJIwzZqFMYlWgEs6Th3Z5DBEnE0ggoORNE";
const PRIVATE_VAPID_KEY = "VNlZ24OTut7qA9bG5t1Y9c8vdqLOidyulldjAVtWiQ4";

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
);

// 🔥 Keep subscriptions in memory (restart clears data)
let SUBSCRIPTIONS = [];

// ✅ Handle POST Request (Subscribe User)
export async function POST(req) {
  try {
    const subscription = await req.json();

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { error: "Invalid subscription data" },
        { status: 400 }
      );
    }

    // Prevent duplicate subscriptions
    const exists = SUBSCRIPTIONS.find((sub) => sub.endpoint === subscription.endpoint);
    if (!exists) {
      SUBSCRIPTIONS.push(subscription);
      console.log("New Subscription Stored:", subscription);
    }

    return NextResponse.json(
      { message: "Subscribed successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subscription Error:", error);
    return NextResponse.json(
      { error: "🚨 Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ Handle GET Request (Send Notifications)
export async function GET() {
  if (SUBSCRIPTIONS.length === 0) {
    return NextResponse.json({ error: "No active subscriptions found" }, { status: 400 });
  }

  const payload = JSON.stringify({
    title: "New Notification",
    message: "This is a test push notification!",
  });

  // Send notification to each subscriber
  SUBSCRIPTIONS.forEach((sub) => {
    webpush.sendNotification(sub, payload).catch((err) => console.error("Push Error:", err));
  });

  return NextResponse.json({ message: "Notifications sent successfully" }, { status: 200 });
}

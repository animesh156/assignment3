export async function subscribeUser() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      console.log("New Push Subscription:", subscription);

      const response = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      console.log("Subscription Response:", result);

    } catch (error) {
      console.error("Push Subscription Failed:", error);
    }
  }
}

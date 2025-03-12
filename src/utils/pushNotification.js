export async function subscribeUser() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BOamQs4uzigQ5TLMa-PtBX0Roiqa0JRR8OHakjZvNU38Iu-6HtXW2ZJIwzZqFMYlWgEs6Th3Z5DBEnE0ggoORNE",
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

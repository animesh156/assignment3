/* eslint-disable @next/next/no-img-element */
"use client";
import Button from "@/components/Button";
import { useEffect } from "react";
import { subscribeUser } from "@/utils/pushNotification";

export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Service Worker Registered"))
        .catch((error) =>
          console.error("Service Worker Registration Failed", error)
        );
    }

    subscribeUser();
  }, []);

  async function sendNotification() {
    try {
      const response = await fetch("/api/subscribe", { method: "GET" });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || `HTTP error! Status: ${response.status}`);
      }
       
      alert("✅ Notification sent successfully!");

      console.log("Notification Response:", result);
    } catch (error) {
      console.error("Failed to send notification:", error.message);
      alert("❌ Failed to send notification!");
    }
  }
  

  return (
    <>
      <div
        className="w-[300px] text-center text-white h-[600px] m-auto mt-5 border"
        style={{ background: "linear-gradient(to bottom, #2C2143, #000000)" }}
      >
        <h1 className="text-center text-sm mt-5 mb-4">Hola!</h1>

        {/* Background Image Section */}
        <div
          className="relative"
          style={{
            backgroundImage: "url('/bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "320px",
          }}
        >
          <img
            src="Vector.png"
            alt="bell_img"
            className="absolute top-14 left-12"
          />
        </div>

        <div className="mt-12">
          <h5 className="font-bold text-lg">Lorem Ipsum...</h5>
          <p className="text-sm text-gray-300 font-light">
            Lorem ipsum dolor sit amet.
          </p>
          <Button onClick={sendNotification} />
        </div>
      </div>
    </>
  );
}

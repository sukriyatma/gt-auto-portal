"use client";
import { firebaseConfig, messaging } from "@/lib/FireBase";
import { getToken } from "firebase/messaging";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const firebaseConfigParams = new URLSearchParams(firebaseConfig).toString();

  const swUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/firebase-messaging-sw.js?${firebaseConfigParams}`;

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted"){
      const token = await getToken(messaging, {
        vapidKey: "BAnQRq4ItH8Fae4_63mDpBkKip9iTCErUgftTI0wyaUygXvq8KMZrJdYwIfvJ5BuitBCshYqiVdU7BqTtNX9EhA"
      });
      console.log("Current token", token);
    } else if(permission == "denied") {
      console.log("Access denied");
    }

  }

  useEffect(() => {
    requestPermission();
  }, [])

  redirect("/monitoring")
  return <></>
}

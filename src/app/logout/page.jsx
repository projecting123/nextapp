"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    const logOut = async () => {
      try {
        const response = await axios.get("api/students/logout");
        if (response.data.status === 'error') {
          console.error("Logout failed:", response.data.message);
        } else {
          router.push("/login");
          router.refresh()
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };
    logOut();
  }, []);
  return <></>;
}

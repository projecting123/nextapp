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
        if (response.status === 200) {
          router.push("/login");
          router.refresh()
        } else {
          console.error("Logout failed:", response.data.message);
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };
    logOut();
  }, []);
  return <></>;
}

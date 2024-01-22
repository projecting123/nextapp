"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const studentData = async () => {
      try {
        const res = await axios.get("/api/students/dashboard");
        setUser(res.data.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    studentData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold text-green-700">Dashboard Page</h1>
        {user && <h1 className="text-xl">Welcome {user.name}</h1>}
        <div className="h-[1px] opacity-40 w-[80vw] mt-4 bg-black"></div>
        <h1 className="font-semibold opacity-70 text-cyan-700">This page will be designed later.</h1>
      </div>
    </>
  );
}

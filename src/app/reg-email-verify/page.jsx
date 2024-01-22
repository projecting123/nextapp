"use client";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegEmailVerify() {
  const searchParams = useSearchParams();
  const [messageWithStatus, setMessageWithStatus] = useState({});
  const router = useRouter();

  
  useEffect(() => {
    const token = searchParams.get("token");
    const verifyToken = async () => {
      const response = await axios.post(`/api/students/verify-email`, {
        token: token
      });
      if (response.data.status == 'error') {
        setMessageWithStatus(prev => ({...prev, status: response.data.status, message: response.data.message}))
      }
      else if(response.data.status =='success') {
        setMessageWithStatus(prev => ({...prev, status: response.data.status, message: response.data.message}))
        setTimeout(() => {
          router.push('/login')
        }, 1200);
      }
    };
    verifyToken();
  }, []);
  return (
    <>
      <Stack justifyContent={"center"} alignItems={"center"} height={"90vh"}>
        {messageWithStatus.status == 200 && (
          <Stack alignItems={"center"}>
            <DoneOutlineIcon sx={{ color: "green", fontSize: 100 }} />
            <Typography
              sx={{ color: "green", textAlign: "center", fontSize: 30 }}
            >
              {messageWithStatus.message}
            </Typography>
            <Typography sx={{opacity: 0.7, fontSize: 20}}>Page will be redirected after 1 second...</Typography>
          </Stack>
        )}
        {messageWithStatus.status == 404 && (
          <Stack alignItems={"center"}>
            <CancelIcon sx={{ color: "red", fontSize: 100 }} />
            <Typography
              sx={{ color: "red", textAlign: "center", fontSize: 30 }}
            >
              {messageWithStatus.message}
            </Typography>
          </Stack>
        )}
        {messageWithStatus.status == 500 && (
          <Stack alignItems={"center"}>
            <CancelIcon sx={{ color: "red", fontSize: 100 }} />
            <Typography
              sx={{ color: "red", textAlign: "center", fontSize: 30 }}
            >
              {messageWithStatus.message}
            </Typography>
          </Stack>
        )}
      </Stack>
    </>
  );
}

"use client";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState({});
  const [emailMessage, setEmailMessage] = useState({});
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      formData.password?.length >= 3 &&
      formData.email?.includes("@gmail.com") &&
      emailMessage.type == "success"
    ) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [formData.password, formData.email, emailMessage]);
  const passwordInputHandle = (e) => {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  };

  const emailInputHandle = async (e) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  };

  const emailAvailableChecker = async () => {
    if (formData.email && formData.email.includes("@gmail.com")) {
      const response = await axios.post("/api/students/isemailavailable", {
        email: formData.email,
        type: "login",
      });
      if (response.data.status == "error") {
        setEmailMessage({
          message: response.data.message,
          type: response.data.status,
        });
      } else {
        setEmailMessage({
          message: response.data.message,
          type: response.data.status,
        });
      }
    } else {
      setEmailMessage({ message: "Enter a valid email...", type: "error" });
    }
  };

  const submitHandler = async (e) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/students/login", formData);
      if (response.data.status == "error") {
        toast.error(response.data.message);
      } else if (response.data.status == "success") {
        toast.success(response.data.message);
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const keySubmitHandler = (e) => {
    if (e.key === "Enter" && !isDisable) {
      submitHandler(e);
    }
  };
  return (
    <>
      <div className="flex select-none justify-center items-center min-h-screen">
        <form
          action=""
          className="bg-sky-300 w-[400px] p-4 flex flex-col gap-6 shadow-md"
          autoComplete="off"
        >
          <h1 className="text-center text-2xl font-bold opacity-70">
            Login Form
          </h1>
          <div className="flex flex-col">
            <TextField
              type="email"
              name="email"
              label="Enter your email"
              size="small"
              onChange={emailInputHandle}
              onKeyDown={keySubmitHandler}
              onBlur={emailAvailableChecker}
              helperText={
                emailMessage.message ? (
                  <span
                    className={
                      emailMessage.type == "success"
                        ? "font-bold text-green-700"
                        : "font-bold text-red-700"
                    }
                  >
                    {emailMessage.message}
                  </span>
                ) : (
                  <span className="font-bold">Enter your registered email</span>
                )
              }
            />
          </div>

          <div className="flex flex-col">
            <TextField
              type="password"
              label="Enter your password"
              size="small"
              name="password"
              onChange={passwordInputHandle}
              onKeyDown={keySubmitHandler}
            />
          </div>

          <LoadingButton
            disabled={isDisable}
            loading={isLoading}
            variant="outlined"
            type="button"
            onClick={submitHandler}
          >
            Submit
          </LoadingButton>
        </form>
      </div>
      <Toaster />
    </>
  );
}

"use client";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterPage() {
  const [formData, setFormData] = useState({});
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState(null);
  useEffect(() => {
    if (
      formData.name?.length > 0 &&
      formData.password?.length >= 3 &&
      formData.email?.includes("@gmail.com") &&
      emailMessage?.type == "success"
    ) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [formData.name, formData.password, formData.email, emailMessage]);

  const nameInputHandle = async (e) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const passwordInputHandle = async (e) => {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  };

  const emailInputHandle = async (e) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  };

  const emailAvailableChecker = async () => {
    if (formData.email && formData.email.includes("@gmail.com")) {
      const response = await axios.post("/api/students/isemailavailable", {
        email: formData.email,
        type: "registration",
      });
      if (response.data.status == "error") {
        setEmailMessage({ message: response.data.message, type: "error" });
      } else {
        setEmailMessage({ message: response.data.message, type: "success" });
      }
    }
    else{
      setEmailMessage({message: 'Enter a valid email', type: 'error'})
    }
  };

  const submitHandler = async (e) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/students/register", formData);
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        toast.success("Registration successful.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const keySubmitHandler = async (e) => {
    if (e.key == "Enter" && !isDisable) {
      submitHandler(e);
    }
  };

  return (
    <>
      <div className="flex select-none justify-center items-center min-h-screen">
        <form
          action=""
          className="bg-sky-300 p-4 flex flex-col w-[400px] gap-6 shadow-md"
          autoComplete="off"
        >
          <h1 className="text-center text-2xl font-bold opacity-70">
            Registration Form
          </h1>
          <div className="flex flex-col">
            <TextField
              label="Enter your name"
              size="small"
              name="name"
              onKeyDown={keySubmitHandler}
              onChange={nameInputHandle}
            />
          </div>
          <div className="flex items-center relative justify-between">
            <TextField
              type="email"
              name="email"
              label="Enter your email"
              size="small"
              sx={{ flex: 0.95 }}
              onChange={emailInputHandle}
              onKeyDown={keySubmitHandler}
              helperText={
                emailMessage ? (
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
                  "We don't share your email to anyone"
                )
              }
              onBlur={emailAvailableChecker}
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
              helperText={`Password must be at least 3 characters`}
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

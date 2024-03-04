"use client";
import { useState } from "react";
import OtpInput from "./components/OtpInput";
import { RE_DIGT } from "./utlis/constants";
const otpLength = 6;
export default function Home() {
  const [otp, setOtp] = useState("");
  const onChange = (newValue: string) => {
    setOtp(newValue);
    //auto submit when last place is filled
    if (newValue.length === otpLength && RE_DIGT.test(newValue.slice(-1))) {
      submitotp(newValue);
    }
  };
  const submitotp = (newValue: string) => {
    console.log("Submiting OTP: ", newValue);
  };
  return <OtpInput value={otp} onChange={onChange} valueLength={otpLength} />;
}

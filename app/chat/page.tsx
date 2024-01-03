"use client";
import SBProvider from "@sendbird/uikit-react/SendbirdProvider";
import "@sendbird/uikit-react/dist/index.css";
import dynamic from "next/dynamic";


const CustomizedApp = dynamic(() => import("../components/CustomizedApp"), {
    ssr: false,
    loading: () => <p>...</p>
  });
  
export default function Chat() {
  return (
    <SBProvider
      appId={"B44B43A4-6969-4A15-B8B5-C1AEA0540476"}
      userId={"imu san"}
      theme="dark"
    >
      <CustomizedApp />
    </SBProvider>
  );
}

"use client";

import InboxLanding from "@/components/shared/inbox/InboxLanding";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Inbox() {
  const router = useRouter();
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile) {
      router.push("/auth/login");
    }
  }, []);
  return (
    <>
      <InboxLanding />
    </>
  );
}

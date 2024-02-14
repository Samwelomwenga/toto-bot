"use client";
import { useState } from "react";

import Header from "@/components/Header";
import Chat from "../components/chat";
import Menu from "@/components/Menu";

export const runtime = "edge";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <main className=" min-h-svh w-full   bg-green-200 bg-cover bottom-0 md:grid grid-cols-6 md:grid-rows-1 h-full">
      <Header isOpen={isOpen} toggle={toggle} />
      <Menu isOpen={isOpen} />
      <Chat />
    </main>
  );
}

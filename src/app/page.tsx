import Header from "@/components/Header";
import Chat from "../components/chat";

export const runtime = "edge";

export default function Page() {
  return (
    <main className=" min-h-svh w-full   bg-green-200">
      <Header/>
      <Chat />
    </main>
  );
}

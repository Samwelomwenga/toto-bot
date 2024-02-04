import Chat from "./chat";

export const runtime = "edge";

export default function Page() {
  return (
    <div className="h-full w-full p-8 flex bg-red-500">
      <Chat />
    </div>
  );
}

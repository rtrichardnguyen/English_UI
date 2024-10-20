import { Header } from "@/components/header";
import { Dashboard } from "./dashboard";

export default function Home() {
  return (
    <>
      <div className="f-4 flex h-14 items-center justify-between supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <Header />
      </div>
      <div className="w-screen min-h-screen mt-6">
          <Dashboard />
      </div>
    </>
  );
}

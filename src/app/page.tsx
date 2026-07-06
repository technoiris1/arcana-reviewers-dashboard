import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center h-screen w-screen">
      <a href="/api/auth/login">
      <Button className="bg-[#ec3750] hover:bg-[#f80d2c] text-white font-bold py-2 px-4 rounded cursor-pointer">
        Login with Hack Club
      </Button>
      </a>
    </div>
  );
}

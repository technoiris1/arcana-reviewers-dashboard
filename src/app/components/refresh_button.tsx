"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          router.refresh();
        })
      }
      className="cursor-pointer"
    >
      <RefreshCw
        className={`mr-2 h-4 w-4 ${
          isPending ? "animate-spin" : ""
        }`}
      />
      {isPending ? "Refreshing..." : "Refresh"}
    </Button>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
export function ReviewButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  async function markReviewed() {
    await fetch("/api/reviews/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

toast.success("Project marked as reviewed!", {
  className: "border-green-500 bg-green-50 text-green-900",
});
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <Button
      disabled={pending}
      onClick={markReviewed}
      className="bg-green-600 hover:bg-green-700 cursor-pointer"
    >
      {pending ? "Updating..." : "Mark Reviewed"}
    </Button>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ReviewButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  async function markReviewed() {
    const res = await fetch("/api/reviews/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      toast.error("Something went wrong.");
      return;
    }

    toast.success("Project marked as reviewed!", {
      className: "border-green-500 bg-green-50 text-green-900",
    });

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <AlertDialog>
<AlertDialogTrigger
  render={
    <Button className="bg-green-600 hover:bg-green-700 cursor-pointer">
      {pending ? "Updating..." : "Mark Reviewed"}
    </Button>
  }
/>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Mark this project as reviewed?
          </AlertDialogTitle>

          <AlertDialogDescription>
            um you sure? this will remove the project from the review queue
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={markReviewed}
            className="bg-green-600 hover:bg-green-700 cursor-pointer"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
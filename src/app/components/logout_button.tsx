"use client";

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

export default function LogoutButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button className="bg-[#ec3750] hover:bg-[#d92d48] cursor-pointer">
            Logout
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out?</AlertDialogTitle>

          <AlertDialogDescription>
            You'll be signed out of your account and will need to log in again
            to access the dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() => {
              window.location.href = "/api/auth/logout";
            }}
            className="bg-[#ec3750] hover:bg-[#d92d48] cursor-pointer"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
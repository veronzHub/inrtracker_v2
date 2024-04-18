// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MdModeEditOutline } from "react-icons/md";

export default function UpdateDateForm() {
  return (
    <Dialog>
      <DialogTrigger>
        <MdModeEditOutline className="w-4 h-4 text-slate-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Date</DialogTitle>
          <DialogDescription>
            Make changes to this Date. Click update when you're done.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

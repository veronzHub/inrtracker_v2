"use client";

import { deleteMissedWarfarinDosage } from "@/app/actions/warfarin";
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
import { AiFillDelete } from "react-icons/ai";

type TDeleteForm = {
  id: number;
  note: string | null;
  date: string | null;
};

export default function DeleteForm({ id, note, date }: TDeleteForm) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <AiFillDelete className="w-6 h-6 text-slate-700" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-3">Deleting this entry cannot be undone.</p>
              <p>
                <b>Date:</b>{" "}
                {new Date(date.replace(/-/g, "/") as string).toLocaleDateString(
                  "en-US",
                  {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  }
                )}
              </p>
              <p>
                <b>Note:</b> {note}
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-700"
              onClick={async () => await deleteMissedWarfarinDosage(id)}
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

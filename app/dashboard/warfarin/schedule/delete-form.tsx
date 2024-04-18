"use client";

import { inrDelete } from "@/app/actions/inr";
import { deleteWarfarinScheduleAndDosages } from "@/app/actions/warfarin";
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

export default function DeleteForm({
  id,
  startDate,
}: {
  id: number;
  startDate: string;
}) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <AiFillDelete className="w-6 h-6 " />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="mb-3">
                Deleting this entry cannot be undone.
                <br />
                <span>
                  <b>Start Date:</b>{" "}
                  {new Date(
                    startDate.replace(/-/g, "/") as string
                  ).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
                <br />
                <span>ID: {id}</span>
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-700"
              onClick={async () => await deleteWarfarinScheduleAndDosages(id)}
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

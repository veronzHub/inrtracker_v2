"use client";

import { deleteWarfarinPreferences } from "@/app/actions/warfarin";
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
import { IoMdClose } from "react-icons/io";

type TDeleteForm = {
  id: number;
  pill_strength: string | null;
  unit: string | null;
};

export default function DeleteForm({ id, pill_strength, unit }: TDeleteForm) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <IoMdClose className="w-6 h-6 text-white" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-3">Deleting this entry cannot be undone.</p>
              <p>
                <b>Pill Strength:</b> {`${pill_strength}${unit}`}
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-700"
              onClick={async () => await deleteWarfarinPreferences(id)}
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

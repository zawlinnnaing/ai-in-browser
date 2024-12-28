import { Model } from "@/hooks/useModels";
import { PropsWithChildren } from "react";
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
} from "../ui/alert-dialog";

export interface DeleteModalDialogProps extends PropsWithChildren {
  model: Model;
  onDelete: () => void;
  asChild?: boolean;
}

export default function DeleteModalDialog(props: DeleteModalDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={props.asChild}>
        {props.children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete the model "{props.model.name}"?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will remove all the files associated with this model. The model
            files will be re-downloaded if you run them again. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={props.onDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

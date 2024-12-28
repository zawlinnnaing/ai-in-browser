import { Model } from "@/hooks/useModels";
import { formatNumber } from "@/lib/shared/utils";
import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import DeleteModalDialog from "./DeleteModelDialog";

export interface ModelItemProps {
  model: Model;
  onDelete: () => void;
}

export default function ModelItem(props: ModelItemProps) {
  return (
    <Card className="p-4">
      <Collapsible>
        <div className="flex justify-between items-center">
          <CollapsibleTrigger className="flex-grow text-left">
            {props.model.name}
          </CollapsibleTrigger>
          <DeleteModalDialog model={props.model} onDelete={props.onDelete}>
            <Button size="icon" variant="ghost">
              <TrashIcon className="text-destructive" />
            </Button>
          </DeleteModalDialog>
        </div>
        <CollapsibleContent className="p-4 space-y-2">
          <p className="text-sm">Files</p>
          {props.model.files.map((file) => {
            return (
              <div>
                <p className="text-muted-foreground">{file.url}</p>
                <p className="text-xs text-muted-foreground/80">
                  File size: {formatNumber(file.size)} bytes
                </p>
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

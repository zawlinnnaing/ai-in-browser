import { PropsWithChildren } from "react";

export interface PageLayoutProps
  extends PropsWithChildren<{
    title: string;
    description?: string;
  }> {}

export default function PageLayout(props: PageLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl">{props.title}</h1>
        {props.description && (
          <p className="text-sm text-muted-foreground">{props.description}</p>
        )}
      </div>
      <div>{props.children}</div>
    </div>
  );
}

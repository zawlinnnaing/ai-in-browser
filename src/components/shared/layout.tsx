import { PropsWithChildren } from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "./AppSideBar";

type Props = PropsWithChildren;

export default function Layout(props: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="py-6 px-4 w-full">
        <SidebarTrigger />
        {props.children}
      </main>
    </SidebarProvider>
  );
}

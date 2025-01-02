import { Outlet } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppHeader />
        <div className="p-4 md:py-6 max-w-screen-lg mx-auto">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}

import { BrainIcon, SettingsIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Link } from "react-router";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h1 className="text-2xl">ML in browser</h1>
        <p className="text-muted-foreground text-xs">
          A collection of ML models running in browser
        </p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <BrainIcon /> &nbsp; Models
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/doc-q-and-a">Document Q&A</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            <SettingsIcon /> &nbsp; Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings/models-management">
                    Models management
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-muted-foreground text-xs">
          Powered by{" "}
          <a
            className="text-blue-500 hover:text-blue-600"
            href="https://huggingface.co/docs/transformers.js/en/index"
            target="_blank"
          >
            Transformers.js
          </a>
          .
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}

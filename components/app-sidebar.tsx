import { Inbox, Settings, LayoutDashboardIcon, ListOrdered, CreditCard, LucideCircleDollarSign, Video, User, LucideMessageCircleQuestion, Bug, LogOut } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboardIcon,
    },
    {
        title: "Orders",
        url: "/orders",
        icon: ListOrdered,
    },
    {
        title: "Credits",
        url: "/credits",
        icon: CreditCard,
    },
    {
        title: "Invoices",
        url: "/invoices",
        icon: LucideCircleDollarSign,
    },
    {
        title: "Messages",
        url: "/messages",
        icon: Inbox,
    },
    {
        title: "Channel",
        url: "/channel",
        icon: Video,
    },
    {
        title: "My Profile",
        url: "profile",
        icon: User,
    },
    {
        title: "Support",
        url: "/support",
        icon: LucideMessageCircleQuestion,
    },
    {
        title: "Logout",
        url: "/logout",
        icon: LogOut,
    },
    {
        title: "Report a bug",
        url: "/reportbug",
        icon: Bug,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Igra Studios</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
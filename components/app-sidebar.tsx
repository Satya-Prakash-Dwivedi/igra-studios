// components/ui/Sidebar.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "../components/ui/sidebar";
import {
    LayoutDashboardIcon,
    ListOrdered,
    CreditCard,
    LucideCircleDollarSign,
    Inbox,
    Video,
    User,
    LucideMessageCircleQuestion,
    Bug,
    LogOut,
} from "lucide-react";

const items = [
    { title: "Dashboard", icon: LayoutDashboardIcon },
    { title: "Orders", icon: ListOrdered },
    { title: "Credits", icon: CreditCard },
    { title: "Invoices", icon: LucideCircleDollarSign },
    { title: "Messages", icon: Inbox },
    { title: "Channel", icon: Video },
    { title: "My Profile", icon: User },
    { title: "Support", icon: LucideMessageCircleQuestion },
    { title: "Report a bug", icon: Bug },
    { title: "Logout", icon: LogOut },
];

export function AppSidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") ?? "";

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-igrared">
                        IGRA Studios
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = item.title === activeTab;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <Link href={`/?tab=${encodeURIComponent(item.title)}`} passHref>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                data-active={isActive}
                                            >
                                                <a className="flex items-center gap-2">
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Header from "@/components/Header";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const noSidebarRoutes = ["/login", "/signup", "/verify-email"];
    const hideSidebar = noSidebarRoutes.includes(pathname);

    if (hideSidebar) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <SidebarProvider>
                <AppSidebar />
                <main className="flex-1 w-full">
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </>
    );
}

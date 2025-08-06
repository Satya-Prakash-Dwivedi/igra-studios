// app/(auth)/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {/* No SidebarProvider or AppSidebar here */}
                <main className="min-h-screen flex items-center justify-center">
                    {children}              {/* login/page.tsx or signup/page.tsx */}
                </main>
            </body>
        </html>
    );
}

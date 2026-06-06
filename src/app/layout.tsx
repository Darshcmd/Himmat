import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
    title: "Himmat: By Darsh",
    description: "Helping students stay strong before burnout begins.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="min-h-screen overflow-x-hidden bg-slate-950 font-sans selection:bg-cyan-200 selection:text-slate-950">
                <Navbar />
                {children}
            </body>
        </html>
    );
}

import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://himmat-by-darsh.vercel.app"),
    applicationName: "Himmat",
    authors: [{ name: "Darsh Soni" }],
    creator: "Darsh Soni",
    title: {
        default: "Himmat: By Darsh",
        template: "%s | Himmat",
    },
    description: "Predictive burnout and exam-readiness dashboard for JEE and Indian exam students.",
    keywords: [
        "Himmat",
        "JEE mental health",
        "Indian students",
        "burnout prevention",
        "exam readiness",
        "student wellness",
        "NEET",
        "CUET",
        "Board Exams",
    ],
    icons: {
        icon: "/icon.svg",
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
        title: "Himmat: By Darsh",
        description: "Helping JEE and Indian exam students stay strong before burnout begins.",
        siteName: "Himmat",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
    twitter: {
        card: "summary",
        title: "Himmat: By Darsh",
        description: "Predictive student wellness for JEE and Indian exam pressure.",
    },
};

export const viewport: Viewport = {
    colorScheme: "dark",
    themeColor: "#07111f",
    width: "device-width",
    initialScale: 1,
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

import "~/styles/globals.css";
import { cookies } from "next/headers";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "./components/ui/sonner";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";

import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";

export const metadata: Metadata = {
  title: "URL Shortener",
  description:
    "A simple URL shortening service. Build with Next.js, TypeScript, and Tailwind CSS.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const sidebarOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body className="[--header-height:calc(--spacing(14))]">
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider
              className="flex flex-col"
              defaultOpen={sidebarOpen}
            >
              <SiteHeader />
              <main className="flex flex-1">
                <AppSidebar />
                <SidebarInset>{children}</SidebarInset>
              </main>
              <Toaster position="bottom-right" richColors />
            </SidebarProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

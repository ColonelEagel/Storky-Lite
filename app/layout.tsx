import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ToastProvider } from "@/provider/toast-provider";
import { ThemeProvider } from "@/provider/theme-provider";
import AuthProvider from "@/provider/authProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Storky Light",
  description: "Your friendly learning companion",
};
interface RootLayoutProps {
  children: React.ReactNode;
  session: any;
}

export default function RootLayout({
  children,
  session,
}: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className={inter.className}>
        <AuthProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            <div className="min-h-screen">
              <Navbar />
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

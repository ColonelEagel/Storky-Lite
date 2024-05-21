import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

/**
 * The layout component is the root component for the application.
 * It wraps all the child components and provides them with necessary context.
 */

// Importing the necessary components
// The Navbar component is used for rendering the navigation bar at the top of the page
import Navbar from "@/components/navbar";
// The Footer component is used for rendering the footer at the bottom of the page
import Footer from "@/components/footer";
// The ToastProvider component is used for providing the toast context to the child components
import { ToastProvider } from "@/provider/toast-provider";
// The ThemeProvider component is used for providing the theme context to the child components
import { ThemeProvider } from "@/provider/theme-provider";
// The AuthProvider component is used for providing the authentication context to the child components
import AuthProvider from "@/provider/authProvider";

// Importing the Inter font from Google Fonts
const inter = Inter({ subsets: ["latin"] });

/**
 * The metadata object contains metadata for the page.
 * It includes the page title and description.
 */
export const metadata: Metadata = {
  title: "Storky Light",
  description:
    "Storky app is an online course building platform that enables you to run a smooth and efficient virtual classroom, to motivate your students to engage with you during your classes. We care about teaching performance. Start your class remotely via a simple, reliable all-in-one platform in less than a minute.",
};

/**
 * RootLayoutProps is an interface that defines the properties
 * of the RootLayout component.
 */
interface RootLayoutProps {
  children: React.ReactNode; // The children of the component
  session: any; // The session data
}

/**
 * RootLayout is the root layout component of the application.
 * It wraps all the child components and provides them with necessary context.
 * @param {RootLayoutProps} props - The props object containing the children and session data.
 * @returns {JSX.Element} The rendered RootLayout component.
 */
export default function RootLayout({
  children,
  session,
}: RootLayoutProps): JSX.Element {
  // Rendering the RootLayout component
  return (
    // The html tag
    <html lang="en">
      {/* The head tag */}
      <Head>
        {/* The apple touch icon */}
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        {/* The favicon for different screen sizes */}
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
        {/* The web manifest file */}
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      {/* The body tag */}
      <body className={inter.className}>
        {/* The AuthProvider component for providing authentication context */}
        <AuthProvider session={session}>
          {/* The ThemeProvider component for providing theme context */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* The ToastProvider component for providing toast context */}
            <ToastProvider />
            {/* The main content */}
            <div className="min-h-screen">
              {/* The Navbar component */}
              <Navbar />
              {/* The children components */}
              {children}
            </div>
            {/* The Footer component */}
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


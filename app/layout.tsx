import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import "./globals.css";
import { Providers } from "./providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Farmly",
  description: "Your sustainable farming stop over",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

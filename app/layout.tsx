import { MantineProvider, createTheme } from "@mantine/core";
import { generateColors } from "@mantine/colors-generator";
import { Inter, Poppins } from "next/font/google";
import { NavigationProgress } from "@mantine/nprogress";
import "./globals.css";
// core styles are required for all packages
import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import { EXAMPLE_PATH, CMS_NAME } from "@/lib/constants";
import Footer from "@/components/ui/Footer";

const COLORS = {
  primaryColor: "#228B22",
  secondaryColor: "#F0E68C ",
  accent: "#8B0000",
};
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const theme = createTheme({
  fontFamily: "Arial, Verdana,Poppins, sans-serif",
  headings: { fontFamily: "Poppins sans-serif " },
  primaryColor: "primary",
  colors: {
    primary: generateColors("#228B22"),
    secondary: generateColors(COLORS.secondaryColor),
    accent: generateColors(COLORS.accent),
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <section className="min-h-screen">
          <main>
            <MantineProvider theme={theme}>
              <NavigationProgress />
              {children}
            </MantineProvider>
          </main>
          <Footer />
        </section>
      </body>
    </html>
  );
}

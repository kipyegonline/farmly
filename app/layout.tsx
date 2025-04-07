import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
} from "@mantine/core";
import { generateColors, generateColorsMap } from "@mantine/colors-generator";
import { Inter, Poppins } from "next/font/google";
import { NavigationProgress } from "@mantine/nprogress";
import "./globals.css";
// core styles are required for all packages
import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import { EXAMPLE_PATH, CMS_NAME } from "@/lib/constants";
import Footer from "@/components/ui/Footer";
const primaryColours: MantineColorsTuple = [
  "#effbef",
  "#dcf4dc",
  "#b5eab4",
  "#8bdf89",
  "#68d665",
  "#53d04f",
  "#47ce43",
  "#39b535",
  "#30a12d",
  "#228b22",
];
const secondaryColours: MantineColorsTuple = [
  "#fefce3",
  "#faf6d1",
  "#f4eca6",
  "#ede176",
  "#e8d84f",
  "#e4d335",
  "#e3d026",
  "#c9b717",
  "#b2a30b",
  "#998c00",
];
const accentColours = [];
const COLORS = {
  primaryColor: "#228B22",
  secondaryColor: "#F0E68C",
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
    primary: primaryColours,
    secondary: secondaryColours,
    accent: secondaryColours, //generateColors(COLORS.accent),
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

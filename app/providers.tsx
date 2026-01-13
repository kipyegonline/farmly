"use client";
import React, { useState } from "react";
import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
  Flex,
} from "@mantine/core";
import { RouterProgress } from "@/components/RouterProgress";
import Footer from "@/components/ui/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import Header from "@/components/Header";
import MobileDrawer from "@/components/Header/MobileDrawer";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ColorSchemeSync } from "./ColorSchemeSync";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
const categories = [
  "Sustainable Agriculture",
  "Organic Farming",
  "Agroecology",
  "Soil Health",
  "Water Management",
  "Pest Control",
];

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

const theme = createTheme({
  fontFamily: "Arial, Verdana,Poppins, sans-serif",
  headings: { fontFamily: "Poppins sans-serif " },
  primaryColor: "primary",
  colors: {
    primary: primaryColours,
    secondary: secondaryColours,
    accent: secondaryColours,
  },
});

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <ColorSchemeSync />
        <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <section className="min-h-screen">
            <RouterProgress />
            {/* Global Header */}
            <Header
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
            {/* Mobile Menu Drawer */}
            <div className="md:hidden">
              <MobileDrawer
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                categories={categories}
              />
            </div>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
              <Flex gap="xl" className="relative">
                <div className="flex-1">{children}</div>
                <Sidebar />
              </Flex>
            </main>
            <Footer />
            <ScrollToTop />
          </section>
        </div>
        <ProgressBar
          height="4px"
          color="green"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

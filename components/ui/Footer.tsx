"use client";
import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Divider,
  ActionIcon,
  Image,
  Loader,
} from "@mantine/core";
import {
  Sprout,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ChevronRight,
  Heart,
  Leaf,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";
import Link from "next/link";

const currentYear = new Date().getFullYear();

const footerLinks = {
  explore: [
    { label: "Latest Articles", href: "/" },
    {
      label: "Sustainable Agriculture",
      href: "/category/sustainable-agriculture",
    },
    { label: "Organic Farming", href: "/category/organic-farming" },
    { label: "Soil Health", href: "/category/soil-health" },
    { label: "Water Management", href: "/category/water-management" },
  ],
  resources: [
    { label: "Farming Guides", href: "/guides" },
    { label: "Research Papers", href: "/research" },
    { label: "Community Forum", href: "/forum" },
    { label: "Events & Workshops", href: "/events" },
    { label: "Newsletter", href: "/newsletter" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Mission", href: "/mission" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Press Kit", href: "/press" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

function FooterLinkGroup({
  title,
  links,
  delay = 0,
}: {
  title: string;
  links: { label: string; href: string }[];
  delay?: number;
}) {
  return (
    <Box
      className="animate-in fade-in slide-in-from-bottom duration-700"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Text className="font-bold text-lg mb-4 text-white">{title}</Text>
      <Stack gap="xs">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="group flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-all duration-300 no-underline"
          >
            <ChevronRight
              size={14}
              className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-400"
            />
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              {link.label}
            </span>
          </Link>
        ))}
      </Stack>
    </Box>
  );
}

type SubscriptionStatus = "idle" | "loading" | "success" | "error";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubscriptionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/vinnykix@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email,
            _subject: "New Farmly Newsletter Subscription",
            _template: "table",
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success === "true") {
        setStatus("success");
        setEmail("");
        // Reset to idle after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error(data.message || "Subscription failed");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      // Reset error state after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <Box className="absolute inset-0 overflow-hidden pointer-events-none">
        <Box className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <Box className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/3 rounded-full blur-3xl" />
      </Box>

      {/* Main footer content */}
      <Box className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-6 sm:pb-8">
        {/* Top section with logo and newsletter */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          align={{ base: "start", lg: "center" }}
          gap="xl"
          className="mb-8 sm:mb-12 pb-8 sm:pb-12 border-b border-gray-800"
        >
          {/* Logo and tagline */}
          <Box className="animate-in fade-in slide-in-from-left duration-700">
            <Flex align="center" gap="sm" className="mb-3 !hidden">
              <Box className="p-2 bg-emerald-500/20 rounded-xl">
                <Sprout size={32} className="text-emerald-400" />
              </Box>
              <Text className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                Farmly
              </Text>
            </Flex>
            <Box className="w-[120px] sm:w-[160px] md:w-[320px]">
              <Image alt="logo" src="/farmly_logo.png" width={32} height={32} />
            </Box>
            <Text className="text-sm sm:text-base text-gray-400 max-w-md leading-relaxed">
              Cultivating knowledge for a sustainable future. Your trusted
              source for modern farming practices, organic solutions, and
              agricultural innovation.
            </Text>
          </Box>

          {/* Newsletter signup */}
          <Box className="w-full lg:w-auto animate-in fade-in slide-in-from-right duration-700">
            <Text className="font-semibold text-base sm:text-lg mb-3">
              Stay rooted with our newsletter
            </Text>

            {status === "success" ? (
              <Box className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-4 animate-in fade-in zoom-in duration-300">
                <Flex align="center" gap="sm">
                  <CheckCircle size={24} className="text-emerald-400" />
                  <Box>
                    <Text className="text-sm sm:text-base font-medium text-emerald-400">
                      Successfully subscribed!
                    </Text>
                    <Text className="text-xs sm:text-sm text-gray-400">
                      Thank you for joining our community.
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ) : (
              <form onSubmit={handleSubscribe}>
                <Flex gap="sm" className="w-full lg:w-auto">
                  <Box className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") {
                          setStatus("idle");
                          setErrorMessage("");
                        }
                      }}
                      placeholder="Enter your email"
                      disabled={status === "loading"}
                      className={`w-full lg:w-72 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-800/50 border rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${status === "error"
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-700"
                        }`}
                    />
                  </Box>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95 flex items-center gap-2 min-w-[100px] sm:min-w-[120px] justify-center"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader size={18} color="white" />
                        <span className="hidden sm:inline">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span className="hidden sm:inline">Subscribe</span>
                      </>
                    )}
                  </button>
                </Flex>

                {/* Error message */}
                {status === "error" && errorMessage && (
                  <Flex
                    align="center"
                    gap="xs"
                    className="mt-2 animate-in fade-in slide-in-from-top duration-200"
                  >
                    <AlertCircle size={14} className="text-red-400" />
                    <Text className="text-xs text-red-400">{errorMessage}</Text>
                  </Flex>
                )}

                <Text className="text-xs text-gray-500 mt-2">
                  Join 100+ farmers receiving weekly insights
                </Text>
              </form>
            )}
          </Box>
        </Flex>

        {/* Links grid */}
        <Box className=" hidden griddle grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <FooterLinkGroup
            title="Explore"
            links={footerLinks.explore}
            delay={100}
          />
          <FooterLinkGroup
            title="Resources"
            links={footerLinks.resources}
            delay={200}
          />
          <FooterLinkGroup
            title="Company"
            links={footerLinks.company}
            delay={300}
          />

          {/* Contact info column */}
          <Box
            className="animate-in fade-in slide-in-from-bottom duration-700"
            style={{ animationDelay: "400ms" }}
          >
            <Text className="font-bold text-lg mb-4 text-white">
              Contact Us
            </Text>
            <Stack gap="md">
              <Flex align="start" gap="sm" className="text-gray-300">
                <MapPin size={18} className="text-emerald-400 mt-1 shrink-0" />
                <Text className="text-sm">
                  123 Green Valley Road,
                  <br />
                  Sustainable City, SC 12345
                </Text>
              </Flex>
              <Flex
                align="center"
                gap="sm"
                className="text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                <Phone size={18} className="text-emerald-400 shrink-0" />
                <Text className="text-sm">+1 (555) 123-4567</Text>
              </Flex>
              <Flex
                align="center"
                gap="sm"
                className="text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                <Mail size={18} className="text-emerald-400 shrink-0" />
                <Text className="text-sm">hello@farmly.com</Text>
              </Flex>
            </Stack>
          </Box>
        </Box>

        {/* Social links and legal */}
        <Box className="pt-8 border-t border-gray-800">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            gap="lg"
          >
            {/* Social icons */}
            <Flex
              gap="sm"
              className="animate-in fade-in slide-in-from-left duration-700 invisible"
              style={{ animationDelay: "500ms" }}
            >
              {socialLinks.map((social) => (
                <ActionIcon
                  key={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="subtle"
                  size="lg"
                  radius="xl"
                  aria-label={social.label}
                  className="bg-gray-800/50 hover:bg-emerald-600 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/25"
                >
                  <social.icon size={18} />
                </ActionIcon>
              ))}
            </Flex>

            {/* Legal links */}
            <Flex
              gap="xs"
              wrap="wrap"
              justify="center"
              className="animate-in fade-in duration-700"
              style={{ animationDelay: "600ms" }}
            >
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-400 hover:text-emerald-400 transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <Text className="text-gray-700">•</Text>
                  )}
                </React.Fragment>
              ))}
            </Flex>

            {/* Copyright */}
            <Text
              className="text-xs sm:text-sm text-gray-500 animate-in fade-in slide-in-from-right duration-700"
              style={{ animationDelay: "700ms" }}
            >
              © {currentYear} Farmly. All rights reserved.
            </Text>
          </Flex>

          {/* Made with love badge */}
          <Flex
            justify="center"
            align="center"
            gap="xs"
            className="mt-8 pt-6 border-t border-gray-800/50 animate-in fade-in duration-1000"
            style={{ animationDelay: "800ms" }}
          >
            <Text className="text-xs text-gray-500">Made with</Text>
            <Heart size={14} className="text-red-500 animate-pulse" />
            <Text className="text-xs text-gray-500">
              for sustainable farming
            </Text>
            <Leaf size={14} className="text-emerald-500" />
          </Flex>
        </Box>
      </Box>
    </footer>
  );
}

import React from 'react'
import { Card, Flex, Box, Text, Burger,Button } from '@mantine/core'
import { Leaf, Sun, Moon } from 'lucide-react'
type HeaderProps = {
  darkMode: boolean;
toggleDarkMode: () => void;
  mobileMenuOpen: boolean; setMobileMenuOpen: (open: boolean) => void;}
export default function HeaderComponent({darkMode, toggleDarkMode, mobileMenuOpen, setMobileMenuOpen}:HeaderProps) {
  return (
    <Box className={`sticky top-0 z-50 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      } border-b backdrop-blur-md bg-opacity-95`}>
        <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Header */}
          <Flex justify="space-between" align="center" className="h-20 hidden md:flex">
            <Box className="animate-in slide-in-from-left duration-700">
              <Flex align="center" gap="md">
                <Box className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                  <Leaf className="text-emerald-600" size={28} />
                </Box>
                <Box>
                  <Text className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                    Farmly
                  </Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400">
                    Sustainable Agriculture News
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Button
              variant="subtle"
              onClick={toggleDarkMode}
              className="p-2 animate-in slide-in-from-right duration-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </Flex>

          {/* Mobile Header */}
          <Flex justify="space-between" align="center" className="h-16 block md:hidden">
            <Box className="animate-in slide-in-from-left duration-700 hidden">
              <Flex align="center"  gap="sm">
                <Box className="p-1.5 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                  <Leaf className="text-emerald-600" size={20} />
                </Box>
                <Text className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                  Farmly====
                </Text>
              </Flex>
            </Box>
            <Flex align="center" gap="sm">
              <Button
                variant="subtle"
                onClick={toggleDarkMode}
                className="p-2"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
              <Burger
                opened={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              />
            </Flex>
          </Flex>
        </Box>
      </Box>
  )
}

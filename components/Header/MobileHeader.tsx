import React from 'react'
import { Card, Flex, Box, Text, Stack,Burger,Drawer } from '@mantine/core'
import { Leaf, Sun, Moon,  } from 'lucide-react'

type MobileHeaderProps = {
  mobileMenuOpen: boolean;  
    setMobileMenuOpen: (open: boolean) => void;
    darkMode: boolean;

    toggleDarkMode: () => void;
}
export default function MobileHeader({mobileMenuOpen, setMobileMenuOpen, darkMode, toggleDarkMode}:MobileHeaderProps) {
  const categories = ['Sustainable Farming', 'Organic Practices', 'Agroecology', 'Permaculture', 'Regenerative Agriculture'];
  return (
    <Drawer
           opened={mobileMenuOpen}
           onClose={() => setMobileMenuOpen(false)}
           position="right"
           size="sm"
           className="md:hidden"
         >
           <Stack gap="lg" className="p-4">
             <Text className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold">
               Categories
             </Text>
             {categories.map((category, index) => (
               <Text
                 key={category}
                 className="cursor-pointer hover:text-emerald-600 transition-colors animate-in slide-in-from-right duration-300"
                 style={{ animationDelay: `${index * 100}ms` }}
               >
                 {category}
               </Text>
             ))}
           </Stack>
         </Drawer>
  )
}

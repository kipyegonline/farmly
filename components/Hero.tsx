import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

export default function AgroEcoNews() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center mr-3">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <span className="text-xl font-semibold text-gray-900">AgroEco News</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                News
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Resources
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Community
              </a>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </nav>

            {/* Search and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Search className="h-5 w-5" />
              </button>
              <button 
                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">
                  News
                </a>
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50">
                  Resources
                </a>
                <a href="#" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50">
                  Community
                </a>
                <button className="w-full text-left bg-gray-900 text-white px-3 py-2 text-base font-medium hover:bg-gray-800 transition-colors rounded-md mt-2">
                  Subscribe
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <div className="relative h-[500px] sm:h-[600px] lg:h-[700px]">
          {/* Background Image Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600">
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            {/* Simulated field pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full bg-gradient-to-b from-transparent via-green-300 to-green-800"></div>
              <div className="absolute inset-0 bg-repeat" 
                   style={{
                     backgroundImage: `repeating-linear-gradient(
                       90deg,
                       transparent,
                       transparent 20px,
                       rgba(0,0,0,0.1) 20px,
                       rgba(0,0,0,0.1) 22px
                     )`
                   }}>
              </div>
            </div>
            {/* Tree silhouette */}
            <div className="absolute top-10 left-10 w-32 h-40 bg-green-800 rounded-full opacity-60"></div>
            <div className="absolute top-20 left-16 w-8 h-20 bg-green-900 opacity-80"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Sustainable Agriculture: Cultivating a Greener Future
                </h1>
                <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
                  Explore the latest advancements in sustainable farming practices and agroecology, fostering a healthier planet and resilient food systems.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Read More
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-20 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </div>

        {/* Additional Content Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainable Practices</h3>
                <p className="text-gray-600">Learn about eco-friendly farming methods that protect our environment while increasing productivity.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation & Technology</h3>
                <p className="text-gray-600">Discover cutting-edge agricultural technologies and innovations shaping the future of farming.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
                <p className="text-gray-600">Explore how sustainable agriculture benefits local communities and global food security.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
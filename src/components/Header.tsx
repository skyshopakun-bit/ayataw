"use client";

import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold gradient-text">AI Generator Hub</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#generators" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">Generators</a>
            <a href="#gallery" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">Gallery</a>
            <a href="#about" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">About</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-[#1a1a24] transition-colors">
              <svg className="w-5 h-5 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <button 
            className="md:hidden p-2 rounded-lg hover:bg-[#1a1a24] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#2e2e3a]">
            <div className="flex flex-col gap-4">
              <a href="#generators" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">Generators</a>
              <a href="#gallery" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">Gallery</a>
              <a href="#about" className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors">About</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

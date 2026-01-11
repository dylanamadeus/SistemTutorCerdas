"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { fetchWithToken } from "@/lib/fetchWithToken";
import { cn } from "@/lib/utils";

function getNavLinks(Role: string) {
  return [
    { 
      name: "Beranda",
      href: Role === 'teacher' ? "/dosen" :"/"
    },
    {
      name: "Kursus",
      href: Role === 'teacher' ? "/dosen#course" : "/belajar"
    },
    { name: "Kalender", href: "/kalender" },
    { name: "Tutor Cerdas", href: "/tutor" },
  ];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [Role, setRole] = useState('');
  const [Email, setEmail] = useState('');
  const navLinks = getNavLinks(Role);

  useEffect(() => {
    async function fetchUser() {
      try{
        const nameRes = await fetchWithToken('/users/me');
        const nameData = await nameRes.json();

        setName(nameData.name);
        setRole(nameData.role);
        setEmail(nameData.email);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile menu body overflow
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Hapus token saat logout
    Cookies.remove("token");
    setIsLoggedIn(false);
  };


  const toggleSubmenu = (name: string) => {
    if (activeSubmenu === name) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(name);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full  transition-all duration-300 py-3 px-6 md:px-8 lg:px-12 z-50",
        scrolled
          ? "bg-[rgba(156,175,136,0.2)] backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto flex justify-between items-center transition-all duration-300 z-50",
          scrolled ? "max-w-[88rem]" : "max-w-[80rem]"
        )}
      >

        <Link 
          href={Role === 'admin' ? "/Admin" : Role === 'teacher' ? "/Teacher" : "/"}
          className="relative z-10"
        >
          <div className="flex items-center gap-3">
            {/* Logo langsung */}
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden">
              <Image
                src="/LogoUnpad.png"
                alt="Logo Universitas Padjadjaran"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            {/* Tulisan Universitas Padjadjaran */}
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] md:text-[11px] text-[#201916]/70 font-light tracking-widest uppercase">
                Universitas
              </span>
              <span className="text-lg md:text-xl font-bold text-[#FAB12F]">
                Padjadjaran
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <ul className="flex space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                {link.submenu ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleSubmenu(link.name)}
                      className="flex items-center px-3 py-2 text-[#FAB12F] font-medium transition-colors duration-300 hover:text-[#DD0303] rounded-md"
                    >
                      {link.name}
                      <ChevronDown
                        size={16}
                        className={cn(
                          "ml-1 transition-transform duration-200",
                          activeSubmenu === link.name ? "rotate-180" : ""
                        )}
                      />
                    </button>
                    {activeSubmenu === link.name && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-2 z-20 border border-sage-100">
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-forest-700 hover:bg-sage-50 hover:text-[#DD0303]"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-[#FAB12F] font-medium transition-colors duration-300 hover:text-[#DD0303] rounded-md"
                  >
                    {link.name}
                  </Link>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DD0303] transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative inline-block text-left">
              {/* Toggle Button */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-gray-300 font-medium transition-all duration-300 hover:border-[#DD0303]"
                aria-haspopup="true"
                aria-expanded={open}
              >
                <img
                  src="/user.png"
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-800">{name}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <div className="px-4 py-3 text-gray-700 border-b border-gray-200">
                    <p className="text-sm">Selamat datang, <strong>{name}</strong></p>
                    <p className="text-sm mt-1"><strong>{Email}</strong></p>
                  </div>
                  <Link href={'/masuk'}>
                    <div className="px-4 py-2 flex items-center cursor-pointer hover:bg-red-100"
                      onClick={handleLogout}
                    >
                      <img
                        src="/logout.png"
                        alt="Logout"
                        className="w-5 h-5 mr-2 object-contain"
                      />
                      <span className="text-red-600 font-medium">Logout</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href={"/masuk"}>
                <button className="px-4 py-2 rounded-full border-2 border-[#FAB12F] text-[#FAB12F] font-medium transition-all duration-300 hover:bg-forest-50 hover:border-forest-600">
                  Login
                </button>
              </Link>
              <Link href={"/tutor"}>
                <button className="px-4 py-2 rounded-full border-2 border-[#FAB12F] text-[#FAB12F] font-medium transition-all duration-300 hover:bg-forest-50 hover:border-forest-600">
                  Get Help
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-[#FAB12F] p-2 rounded-md hover:bg-forest-50 z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white/95 backdrop-blur-sm z-40 lg:hidden flex-col pt-20 transition-all duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="container bg-white mx-auto px-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
          <ul className="flex flex-col  space-y-2 py-6">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="mobile-menu-item  transition-all duration-300"
              >
                {link.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(link.name)}
                      className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-[#FAB12F] rounded-md hover:bg-sage-100 transition-colors duration-300"
                    >
                      {link.name}
                      <ChevronDown
                        size={20}
                        className={cn(
                          "transition-transform duration-200",
                          activeSubmenu === link.name ? "rotate-180" : ""
                        )}
                      />
                    </button>
                    {activeSubmenu === link.name && (
                      <div className="mt-2 pl-4 space-y-2">
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-2 text-sm text-forest-700 hover:bg-sage-50 hover:text-[#DD0303] rounded-md"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-base font-medium text-[#FAB12F] hover:text-[#DD0303] rounded-md transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
            {isLoggedIn ? (
              <li className="mobile-menu-item pt-4 flex flex-col gap-3 transition-all duration-300 border-t border-gray-200">
                <div className="flex items-center gap-3 px-4">
                  <img
                    src="/user.png"
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="text-sm text-gray-800 font-medium">{name}</p>
                    <p className="text-xs text-gray-600">{Email}</p>
                  </div>
                </div>

                <Link href="/masuk">
                  <div
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 text-red-600 font-medium border-2 border-red-200 rounded-full hover:bg-red-100 transition-all"
                    onClick={handleLogout}
                  >
                    <img
                      src="/logout.png"
                      alt="Logout"
                      className="w-5 h-5 object-contain"
                    />
                    <span>Logout</span>
                  </div>
                </Link>
              </li>
            ) : (
              <li className="mobile-menu-item pt-4 flex flex-col gap-3 transition-all duration-300">
                <Link
                  href="/masuk"
                  className="w-full text-center py-2 rounded-full border-2 border-forest-500 text-forest-600 font-medium hover:bg-forest-50 hover:border-forest-600 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/tutor"
                  className="w-full text-center py-2 rounded-full border-2 border-forest-500 text-forest-600 font-medium hover:bg-forest-50 hover:border-forest-600 transition-all"
                >
                  Get Help
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

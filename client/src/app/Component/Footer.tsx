import React from "react";

export const Footer = (): JSX.Element => {
  return (
    <footer className="bg-transparent py-4 px-4 md:px-6 border-t border-gray-200">
      {/* Top Section */}
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo and Name */}
        <div className="flex items-center gap-2">
          <img
            className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] object-cover"
            alt="Logo Unpad"
            src="/LogoUnpad.png"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[9px] md:text-[10px] text-[#201916]/70 font-light tracking-widest uppercase">
              Universitas
            </span>
            <span className="text-base md:text-lg font-bold text-[#FAB12F]">
              Padjadjaran
            </span>
          </div>
        </div>

        {/* Contact Us */}
        <a
          href="https://wa.me/629681503601"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#1F1A17] text-sm md:text-base hover:text-[#FA812F] transition-colors duration-300"
        >
          Hubungi Kami
        </a>
      </div>

      {/* Bottom Section */}
      <div className="max-w-[1200px] mx-auto mt-5">
        <hr className="border-t border-gray-300/70" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-3">
          {/* Copyright */}
          <div className="flex items-center">
            <img
              className="w-3.5 h-3.5 md:w-4 md:h-4"
              alt="Copyright"
              src="/copyright.png"
            />
            <span className="ml-2 text-[#1F1A17]/80 text-xs md:text-sm">
              Dylan Amadeus, 2025. All rights reserved.
            </span>
          </div>

          {/* Instagram */}
          <a
            href="https://instagram.com/dylanamadeuss"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity duration-300"
          >
            <img
              className="w-4 h-4 md:w-5 md:h-5"
              alt="Instagram"
              src="/instagram.png"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

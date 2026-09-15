"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function Navbar() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogo((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-center z-50">
      <div className="relative w-40 h-10">
        <div className={`absolute inset-0 transition-opacity duration-500 ${showLogo ? "opacity-100" : "opacity-0"}`}>
          <Image src="/IMG-20200913-WA5443.jpg" alt="Logo" fill className="object-contain" />
        </div>
        <div className={`absolute inset-0 flex items-center justify-center text-2xl font-bold text-black transition-opacity duration-500 ${showLogo ? "opacity-0" : "opacity-100"}`}>
          KAIHA
        </div>
      </div>
    </nav>
  );
        }

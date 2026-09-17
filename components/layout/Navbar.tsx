"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [showLogo, setShowLogo] = useState(true);
  useEffect(() => {
    const i = setInterval(() => setShowLogo(p => !p), 2000);
    return () => clearInterval(i);
  }, []);
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-center z-50">
      <div className="w-40 h-10 flex items-center justify-center font-black text-xl tracking-widest">
        {showLogo ? "KAIHA" : "كَيْحَا"}
      </div>
    </nav>
  );
}

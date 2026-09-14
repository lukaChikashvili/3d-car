import Image from "next/image";
import React from "react";

interface HeaderProps {
  onClick: () => void;
}

const Header = ({ onClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 pointer-events-none">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
 
        <div className="pointer-events-auto">
          <Image
            src="/logo.png"
            width={70}
            height={70}
            alt="logo"
            className="object-contain drop-shadow-md"
          />
        </div>


        <button
          onClick={onClick}
          className="
            pointer-events-auto
            group
            relative
            flex items-center gap-3
            px-4 py-2 rounded-full
            bg-black/40 backdrop-blur-md border border-white/10
            text-white/70 hover:text-white
            transition-all duration-300 shadow-lg cursor-pointer
          "
        >
          <span
            className="
              w-2 h-2
              rounded-full
              bg-amber-400
              shadow-[0_0_10px_rgba(251,191,36,0.8)]
              group-hover:scale-125
              transition-transform duration-300
            "
          />

          <span
            className="
              text-[11px]
              font-mono font-semibold
              tracking-[0.25em]
              uppercase
            "
          >
            Keyboard
          </span>

          <span
            className="
              absolute
              -bottom-1
              left-4
              right-4
              h-[2px]
              bg-amber-400
              scale-x-0
              group-hover:scale-x-100
              transition-transform duration-300 origin-left
            "
          />
        </button>

      </div>
    </header>
  );
};

export default Header;
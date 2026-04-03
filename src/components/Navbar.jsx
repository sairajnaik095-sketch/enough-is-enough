import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Events", id: "events" },
    { name: "Videos", id: "videos" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#f5f1e8] border-b border-black/10">

      <div className="flex items-center justify-between px-6 md:px-20 py-4">


        <a href="#home">
          <h1 className="text-xl md:text-2xl font-extrabold italic tracking-wider leading-tight cursor-pointer">
            <span className="text-black">ENOUGH</span>{" "}
            <span className="text-yellow-500">IS ENOUGH</span>
          </h1>
        </a>


        <ul className="hidden md:flex gap-10 text-sm font-medium">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={`#${link.id}`}
                className="hover:text-yellow-500 transition"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* MOBILE MENU BUTTON */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div className="w-6 h-[2px] bg-black mb-1"></div>
          <div className="w-6 h-[2px] bg-black mb-1"></div>
          <div className="w-6 h-[2px] bg-black"></div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#f5f1e8] transition-all duration-300 ${open ? "max-h-[300px] py-6" : "max-h-0 overflow-hidden"
          }`}
      >
        <ul className="flex flex-col items-center gap-6 text-lg font-medium">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="hover:text-yellow-500 transition"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
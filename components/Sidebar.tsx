import {
  ChartBarIcon,
  ClockIcon,
  DotsHorizontalIcon,
  HomeIcon,
} from "@heroicons/react/solid";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiCompassFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Sidebar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("/");

  const SidebarNav = [
    { route: "/", icon: <HomeIcon /> },
    { route: "", icon: <RiCompassFill /> },
    { route: "", icon: <FaMicrophoneAlt /> },
    { route: "", icon: <ChartBarIcon /> },
    { route: "history", icon: <ClockIcon /> },
    { route: "", icon: <DotsHorizontalIcon /> },
  ];
  return (
    <section className="hidden fixed sm:flex flex-col p-4 items-center bg-black w-[90px] h-screen space-y-8 md:border-r-2">
      <Link href="/">
        <Image
          src="https://rb.gy/xkacau"
          width={56}
          height={56}
          className="object-contain"
          alt="logo"
        />
      </Link>

      <div className="flex flex-col space-y-8">
        {SidebarNav.map((prop, i) => (
          <button
            key={i}
            className={`sidebarIcon 
            ${selectedCategory === prop.route && "opacity-100"}
            `}
            onClick={() => setSelectedCategory(prop.route)}
          >
            <Link href={prop.route}>{prop.icon}</Link>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Sidebar;

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
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Sidebar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("/");
  const router = useRouter();

  useEffect(() => {
    setSelectedCategory(router.pathname);
  }, [router.pathname]);

  const SidebarNav = [
    { route: "/", icon: <HomeIcon /> },
    { route: "/explore", icon: <RiCompassFill /> },
    { route: "/player", icon: <FaMicrophoneAlt /> },
    { route: "/playlist", icon: <ChartBarIcon /> },
    { route: "/history", icon: <ClockIcon /> },
    { route: "", icon: <DotsHorizontalIcon /> },
  ];
  return (
    <section className="hidden fixed sm:flex flex-col z-50 p-4 items-center bg-black w-[90px] h-screen space-y-8 md:border-r-2">
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

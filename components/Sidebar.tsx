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
    <section className="fixed bottom-0 sm:flex sm:flex-col z-50 p-4 items-center bg-black w-full sm:w-[90px] sm:h-screen space-y-8 md:border-r-2">
      <div className="hidden sm:inline">
        <Link href="/">
          <Image
            src="https://avatars.githubusercontent.com/u/107163858?v=4"
            width={56}
            height={56}
            className="object-contain rounded-full"
            alt="logo"
            />
        </Link>
      </div>

      <div className="flex sm:flex-col sm:space-y-8">
        {SidebarNav.map((prop, i) => (
          <div key={i} className="flex flex-1 justify-center">
            <button
              className={`sidebarIcon 
              ${selectedCategory === prop.route && "opacity-100"}
              `}
              onClick={() => setSelectedCategory(prop.route)}
              >
              <Link href={prop.route}>{prop.icon}</Link>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Sidebar;

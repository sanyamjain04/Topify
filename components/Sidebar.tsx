import {
  ChartBarIcon,
  ClockIcon,
  DotsHorizontalIcon,
  HomeIcon,
} from "@heroicons/react/solid";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiCompassFill } from "react-icons/ri";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

function Sidebar({selectedCategory}:any) {
  const router = useRouter();
  const handleClick = (route: any) => {
    router.push(route);
  };

  const SidebarNav = [
    { route: "/", icon: <HomeIcon /> },
    { route: "/", icon: <RiCompassFill /> },
    { route: "/", icon: <FaMicrophoneAlt /> },
    { route: "/", icon: <ChartBarIcon /> },
    { route: "history", icon: <ClockIcon /> },
    { route: "/", icon: <DotsHorizontalIcon /> },
  ];
  return (
    <section className="fixed top-0 z-40 flex flex-col p-4 items-center bg-black w-[90px] h-screen space-y-8 border-r-2">
      <Image
        src="https://rb.gy/xkacau"
        width={56}
        height={56}
        className="object-contain"
        alt="logo"
      />

      <div className="flex flex-col space-y-8">
        {SidebarNav.map((prop, i) => (
          <button
          key={i}
          className={`sidebarIcon ${selectedCategory === prop.route && 'opacity-100'}`}
          onClick={() => handleClick(prop.route)}
          >
            <Link href={prop.route}>
            {prop.icon}
            </Link>
          </button>
        ))}
        <HomeIcon className="sidebarIcon opacity-100" />
        <RiCompassFill className="sidebarIcon text-2xl" />
        <FaMicrophoneAlt className="sidebarIcon ml-1" />
        <ChartBarIcon className="sidebarIcon" />
        <ClockIcon className="sidebarIcon" />
        <DotsHorizontalIcon className="sidebarIcon" />
      </div>
    </section>
  );
}

export default Sidebar;

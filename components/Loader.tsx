// import { ThreeBounce } from "better-react-spinkit";
import Image from "next/legacy/image";
import { PulseLoader } from "react-spinners";

function Loader() {
  return (
    <div className="h-screen bg-black">
      <div className="pt-40 flex flex-col items-center space-y-4">
        <span className="relative w-[400px] h-[250px] lg:w-[550px] lg:h-[240px]">
          <Image
            src="https://rb.gy/y9mwtb"
            layout="fill"
            objectFit="contain"
            className="animate-pulse"
            alt=""
          />
        </span>
        <PulseLoader color="#15883e" size={23} />
      </div>
    </div>
  );
}

export default Loader;

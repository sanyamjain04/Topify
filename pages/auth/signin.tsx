import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/legacy/image";
import { useEffect } from "react";
import Loader from "../../components/Loader";

export default function Signin({ providers }: any) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (session) return <Loader />;

  return (
    <div className="bg-black h-screen flex flex-col items-center pt-40 space-y-8">
      <Head>
        <title>Login - Topify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://media.discordapp.net/attachments/1011970131112505376/1044514089591918662/Frame_1.png?width=738&height=311"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
        alt=""
      />
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button
            className="text-white py-4 px-6 rounded-full bg-[#1db954] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

import Image from "next/image";
import L from "@/assets/L.png";
import { createClient } from "@/utils/supabase";

export default function Home() {
  console.log(createClient());
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-20 flex md:flex-row flex-col justify-center items-center">
        <Image
          src={L}
          width={500}
          height={500}
          alt="Picture of L"
          className="rounded-full w-40 md:w-56 md:mr-20 h-fit"
        />
        <div className="mt-6 md:mt-0 md:text-6xl text-4xl">
          Hi, I&apos;m Hanzi
        </div>
      </div>
      <div className="mt-10 md:text-3xl text-xl">
        Software Engineer | 3rd-year CS Student @ McGill
      </div>
    </div>
  );
}

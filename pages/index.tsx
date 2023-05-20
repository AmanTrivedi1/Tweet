import Image from "next/image";
import { Inter } from "next/font/google";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
  });

  function makeid(length: number) {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  useEffect(() => {
    async function f() {
      if (status != "loading" && session) {
        const email = session?.user?.email as string;
        const name = session?.user?.name as string;
        const username = (session?.user?.name?.split(" ")[0] +
          "_" +
          makeid(6)) as string;
      }
    }
    f();
  });

  if (status == "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <button onClick={() => signOut()}>SignOut</button>
      </main>
    </>
  );
}

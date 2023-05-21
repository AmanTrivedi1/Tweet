import Image from "next/image";
import { Inter } from "next/font/google";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
  });

  const [username, setUserName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("/blank_pp.webp");

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

  async function getUser(email: string) {
    const params = new URLSearchParams({
      email: email,
    });
    const response = await fetch("api/user?" + params);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  }

  async function createUser() {
    const email = session?.user?.email as string;
    const name = session?.user?.name as string;
    const username = (session?.user?.name?.split(" ")[0] +
      "_" +
      makeid(6)) as string;
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        username,
        profileImage: "/blank_pp.webp",
      }),
    });
    if (response.status == 200) {
      const data = response.json();
      return data;
    }
  }

  useEffect(() => {
    async function f() {
      if (status != "loading" && session) {
        const data = await getUser(session.user?.email as string);
        if (data.msg == "new user") {
          const userData = await createUser();
          setUserName(userData.user.username);
          setProfileImage(userData.user.profileImage);
        } else {
          setUserName(data.user.username);
          setProfileImage(data.user.profileImage);
        }
      }
    }
    f();
  }, [status, session]);

  if (status == "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center gap-4 p-24 ${inter.className}`}
      >
        <p>username:{username}</p>
        {/* <Image /> */}
        <button onClick={() => signOut()}>SignOut</button>
      </main>
    </>
  );
}

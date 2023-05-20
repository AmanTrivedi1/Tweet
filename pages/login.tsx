import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <button
        className="bg-blue-700 px-4 py-2"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Sign in With Google
      </button>
    </div>
  );
}

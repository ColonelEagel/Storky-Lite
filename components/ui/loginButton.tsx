"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginButton() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="p-4 flex justify-center items-center h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]">
        Loading...
      </div>
    );
  }
  return (
    <>
      {session ? (
        <>
          <button>
            <Link href="/" onClick={() => signOut()}>
              signOut
            </Link>
          </button>
        </>
      ) : (
        <Link href="/login" onClick={() => signIn()}>
          Login
        </Link>
      )}
    </>
  );
}

"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <header className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <nav className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          {session ? (
            <li tabIndex={0} className="relative">
              <a>
                Usuario:
                <b>{session.user.name}</b>
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100 w-60 absolute right-0 shadow-lg">
                <li>
                  <Link href={"/user"}>user</Link>
                </li>
                {session?.user?.role === "admin" && (
                  <li>
                    <Link href={"/admin"}>admin</Link>
                  </li>
                )}
                <li
                  onClick={() => {
                    signOut({ redirect: true, callbackUrl: "/" });
                  }}
                >
                  <a>Sign Out</a>
                </li>
              </ul>
            </li>
          ) : (
            <>
              <li>
                <Link href={"/auth/login"}>Sign In</Link>
              </li>
              <li>
                <Link className="btn btn-accent" href={"/auth/register"}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

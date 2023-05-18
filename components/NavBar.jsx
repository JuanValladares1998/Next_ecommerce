"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <header className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Login de Usuarios</a>
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
              <ul className="p-2 bg-base-100 w-60 z-10 absolute right-0 shadow-lg">
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
                  <a>
                    Salir{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </li>
          ) : (
            <>
              <li>
                <Link href={"/auth/login"}>
                  Ingresar{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link className="btn btn-accent" href={"/auth/register"}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

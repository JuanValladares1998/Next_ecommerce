"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <nav className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          {session && (
            <>
              <li>
                <a>
                  Usuario:
                  <b>{session.user.name}</b>
                </a>
              </li>
              <li>
                <Link href={"/user"}>user</Link>
              </li>
            </>
          )}
          {session?.user?.role === "admin" && (
            <li>
              <Link href={"/admin"}>admin</Link>
            </li>
          )}
          {session ? (
            <li
              onClick={() => {
                signOut({ redirect: true, callbackUrl: "/" });
              }}
            >
              <a>Sign Out</a>
            </li>
          ) : (
            <>
              <li>
                <Link href={"/auth/login"}>Sign In</Link>
              </li>
              <li>
                <Link href={"/auth/register"}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

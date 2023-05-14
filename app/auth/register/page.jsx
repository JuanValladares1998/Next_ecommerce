"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserLogin = () => {
  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });
      if (response.ok) {
        router.push("/auth/login");
      }
    } catch {}
  };

  return (
    <section className="flex min-h-screen flex-col items-center">
      <form onSubmit={login}>
        <div className="card w-[30rem] bg-base-100 shadow-md mx-auto mt-20">
          <div className="card-body">
            <h1 className="card-title">Logearse</h1>
            <p className="text-left">Ingresa tus datos para iniciar seción</p>
            <label htmlFor="username" className="text-left">
              Nombre de usuario
            </label>
            <input
              type="text"
              label="username"
              id="username"
              name="username"
              className="input input-bordered w-full"
            />
            <label htmlFor="email" className="text-left">
              Correo electrónico
            </label>
            <input
              label="email"
              type="email"
              id="email"
              name="email"
              className="input input-bordered w-full"
            />
            <label htmlFor="password" className="text-left">
              Contraseña
            </label>
            <input
              label="password"
              type="password"
              id="password"
              name="password"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary mt-4">
              Ingresar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default UserLogin;

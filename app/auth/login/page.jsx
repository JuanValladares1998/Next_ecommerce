"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

const UserLogin = () => {
  const login = async (e) => {
    e.preventDefault();

    await signIn("credentials", {
      email: e.target.email.value,
      password: e.target.password.value,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <section className="flex min-h-screen flex-col items-center">
      <form onSubmit={login}>
        <div className="card w-[30rem] bg-base-100 shadow-md mx-auto mt-[40%]">
          <div className="card-body">
            <h1 className="card-title">Logearse</h1>
            <p className="text-left">Ingresa tus datos para iniciar seción</p>
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
            <p className="text-center mt-4">
              ¿Olviaste tu contraseña?{" "}
              <Link href={"/auth/reset-password"} className="link">
                Cambiar constraseña
              </Link>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default UserLogin;

"use client";

import { signIn } from "next-auth/react";

const UserLogin = () => {
  const login = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email: e.target.email.value,
      password: e.target.password.value,
      redirect: true,
      callbackUrl: "/",
    });
    console.log(result);
  };

  return (
    <section className="flex min-h-screen flex-col items-center">
      <form onSubmit={login}>
        <div className="card w-[30rem] bg-base-100 shadow-md mx-auto mt-20">
          <div className="card-body">
            <h1 className="card-title">Logearse</h1>
            <p className="text-left">Ingresa tus datos para iniciar seción</p>
            <label htmlFor="email" className="text-left">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input input-bordered w-full"
            />
            <label htmlFor="password" className="text-left">
              Contraseña
            </label>
            <input
              type="text"
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

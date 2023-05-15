"use client";

import { useRouter, useSearchParams } from "next/navigation";

const ConfirmPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const confirmPassword = async (e) => {
    e.preventDefault();

    await fetch(`/api/confirm-password/${token}`, {
      method: "POST",
      body: JSON.stringify({
        password: e.target.password.value,
      }),
    }).then(() => {
      router.push("/auth/login");
    });
  };

  return (
    <section className="flex min-h-screen flex-col items-center">
      <form onSubmit={confirmPassword}>
        <div className="card w-[30rem] bg-base-100 shadow-md mx-auto mt-[30%]">
          <div className="card-body">
            <h1 className="card-title">Nueva contraseña</h1>
            <p className="text-left">
              Ingresa tu nueva contraseña para poder acceder a tu cuenta.
            </p>
            <label htmlFor="password" className="text-left">
              Nueva contraseña
            </label>
            <input
              label="password"
              type="password"
              id="password"
              name="password"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary mt-4">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ConfirmPassword;

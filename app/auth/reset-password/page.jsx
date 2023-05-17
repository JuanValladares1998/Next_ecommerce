"use client";

import ErrorAlert from "@/components/ErrorAlert";
import SuccessAlert from "@/components/SuccessAlert";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ResetPassword = () => {
  const router = useRouter();
  const [alert, setAlert] = useState("");

  const resetPassword = async (e) => {
    e.preventDefault();
    setAlert("");

    const res = await fetch("/api/reset-password", {
      method: "POST",
      body: JSON.stringify({
        email: e.target.email.value,
      }),
    });
    setAlert({ status: res.status, message: await res.text() });
    if (res.status === 500) {
      return;
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center">
      <form onSubmit={resetPassword}>
        <div className="card w-[30rem] bg-base-100 shadow-md mx-auto mt-[40%]">
          <div className="card-body">
            <h1 className="card-title">Recuperar cuenta</h1>
            <p className="text-left">
              Ingresa tu correo y te enviaremos un link con el que podrás
              actualizar tu contraseña.
            </p>
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
            {alert.status === 500 && <ErrorAlert text={alert.message} />}
            {alert.status === 200 && <SuccessAlert text={alert.message} />}
            <button type="submit" className="btn btn-primary mt-4">
              Enivar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;

"use client";

import ErrorAlert from "@/components/alerts/ErrorAlert";
import SubmitButton from "@/components/SubmitButton";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ResetPassword = () => {
  const [alert, setAlert] = useState("");
  const [status, setStatus] = useState("none");

  const resetPassword = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setAlert("");

    const res = await fetch("/api/reset-password", {
      method: "POST",
      body: JSON.stringify({
        email: e.target.email.value,
      }),
    });
    setAlert({ status: res.status, message: await res.text() });
    if (res.status === 500) {
      setStatus("none");
      return;
    }
    setStatus("success");
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
            <SubmitButton status={status}>Enviar</SubmitButton>

          </div>
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;

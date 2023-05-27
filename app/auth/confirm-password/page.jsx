"use client";

import ErrorAlert from "@/components/alerts/ErrorAlert";
import SubmitButton from "@/components/SubmitButton";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ConfirmPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [alert, setAlert] = useState("");
  const [status, setStatus] = useState("none");

  const confirmPassword = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setAlert("");

    const res = await fetch(`/api/confirm-password/${token}`, {
      method: "POST",
      body: JSON.stringify({
        password: e.target.password.value,
      }),
    });
    const message = await res.text();

    setAlert({ status: res.status, message: message });
    if (res.status === 500) {
      setStatus("none");
      return;
    } else {
      setStatus("success");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    }
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
            {alert.status === 500 && <ErrorAlert text={alert.message} />}
            {alert.status === 200 && <SuccessAlert text={alert.message} />}
            <SubmitButton status={status}>Enviar</SubmitButton>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ConfirmPassword;

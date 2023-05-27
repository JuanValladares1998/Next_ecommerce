"use client";

import ErrorAlert from "@/components/alerts/ErrorAlert";
import SubmitButton from "@/components/SubmitButton";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin = () => {
  const router = useRouter();
  const [alert, setAlert] = useState("");
  const [status, setStatus] = useState("none");

  const login = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setAlert("");

    const res = await signIn("credentials", {
      email: e.target.email.value,
      password: e.target.password.value,
      redirect: false,
    });

    if (res.error) {
      setAlert({ message: res.error, status: 500 });
      setStatus("none");
      return;
    } else {
      setStatus("success");
      setAlert({ message: "Logeado correctamente", status: 200 });
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
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
            {alert.status === 500 && <ErrorAlert text={alert.message} />}
            {alert.status === 200 && <SuccessAlert text={alert.message} />}
            <SubmitButton status={status}>Ingresar</SubmitButton>
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

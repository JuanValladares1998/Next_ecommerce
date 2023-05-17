"use client";

import ErrorAlert from "@/components/ErrorAlert";
import SubmitButton from "@/components/SubmitButton";
import SuccessAlert from "@/components/SuccessAlert";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ActivateAccount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [alert, setAlert] = useState("");
  const [status, setStatus] = useState("none");

  const confirmAccount = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setAlert("");

    const res = await fetch(`/api/activate-account/${token}`, {
      method: "POST",
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

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token]);

  return (
    <div>
      <section className="flex min-h-screen flex-col items-center">
        <form onSubmit={confirmAccount}>
          <div className="card w-[30rem] bg-base-100 shadow-md mx-auto mt-[50%]">
            <div className="card-body">
              <h1 className="card-title">Activación de cuenta</h1>
              <p className="text-left">
                Da click en el siguiente botón para terminar con la activación
                de tu cuenta.
              </p>
              {alert.status === 500 && <ErrorAlert text={alert.message} />}
              {alert.status === 200 && <SuccessAlert text={alert.message} />}
              <SubmitButton status={status}>Activar Cuenta</SubmitButton>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ActivateAccount;

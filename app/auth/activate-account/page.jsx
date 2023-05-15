"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ActivateAccount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const confirmAccount = async (e) => {
    e.preventDefault();
    await fetch(`/api/activate-account/${token}`, {
      method: "POST",
    });

    router.push("/auth/login");
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

              <button type="submit" className="btn btn-primary mt-4">
                Activar cuenta
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ActivateAccount;

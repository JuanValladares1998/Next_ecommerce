"use client";

const ResetPassword = () => {
  // const router = useRouter();

  const resetPassword = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/reset-password", {
      method: "POST",
      body: JSON.stringify({
        email: e.target.email.value,
      }),
    });
    console.log(res);
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
            <button type="submit" className="btn btn-primary mt-4">
              Ingresar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;

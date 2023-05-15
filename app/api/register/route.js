import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import transporter from "@/utils/nodemailer";

export const POST = async (req) => {
  const { name, email, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  const accessToken = jwt.sign(
    {
      name: name,
      email: email,
      password: hashedPassword,
    },
    process.env.SECRET_KEY,
    { expiresIn: "20min" }
  );

  await transporter.sendMail({
    from: `"Confirmación de Cuenta" <${process.env.USER_EMAIL}>`,
    to: email,
    subject: "Confirma tu cuenta",
    html: `<a href="http://localhost:3000/auth/activate-account?token=${accessToken}">click aquí</a>`,
  });
  
  console.log("Correo de confirmacion enviado a: " + email);
  return new Response("Correo enviado", { status: 200 });
};

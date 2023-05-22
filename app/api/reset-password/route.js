import activeToken from "@/models/activeTokens";
import disAccount from "@/models/disAccount";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import transporter from "@/utils/nodemailer";
const jwt = require("jsonwebtoken");

export const POST = async (req) => {
  try {
    const { email } = await req.json();
    connectToDB();
    const regEmail = await disAccount.findOne({ email: email });

    if (regEmail)
      return new Response("Ya solicitaste el cambio de contraseña", {
        status: 500,
      });

    const user = await User.findOne({ email: email });
    if (!user) return new Response("Correo no registrado", { status: 500 });

    await disAccount.create({ email });

    const accessToken = jwt.sign(
      {
        email: email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "20min" }
    );
    await activeToken.create({ token: accessToken });

    await transporter.sendMail({
      from: `"Cambio de Contraseña" <${process.env.USER_EMAIL}>`,
      to: email,
      subject: "Cambio de contraseña",
      html: `<a href="http://localhost:3000/auth/confirm-password?token=${accessToken}">click aquí</a>`,
    });

    console.log("Correo de cambio de contraseña enviado a: " + email);
    return new Response("Correo enviado", { status: 200 });
  } catch (err) {
    return new Response({ status: 500 });
  }
};

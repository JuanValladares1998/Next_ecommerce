import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import transporter from "@/utils/nodemailer";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import regEmail from "@/models/regEmails";
import activeToken from "@/models/activeTokens";

export const POST = async (req, res) => {
  try {
    const { name, email, password } = await req.json();
    connectToDB();
    const findUser = await User.findOne({ email: email });
    const registerEmail = await regEmail.findOne({ email: email });
    if (registerEmail)
      return new Response("El correo ya está registrado", { status: 500 });

    await regEmail.create({ email });

    if (findUser)
      return new Response("El correo ya está registrado", { status: 500 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const accessToken = await jwt.sign(
      {
        name: name,
        email: email,
        password: hashedPassword,
      },
      process.env.SECRET_KEY,
      { expiresIn: "20min" }
    );
    await activeToken.create({ token: accessToken });

    await transporter.sendMail({
      from: `"Confirmación de Cuenta" <${process.env.USER_EMAIL}>`,
      to: email,
      subject: "Confirma tu cuenta",
      html: `<a href="http://localhost:3000/auth/activate-account?token=${accessToken}">click aquí</a>`,
    });

    console.log("Correo de confirmacion enviado a: " + email);
    return new Response("Correo enviado", { status: 200 });
  } catch (err) {
    return new Response({ status: 500 });
  }
};

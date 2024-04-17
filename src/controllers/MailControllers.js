const nodemailer = require("nodemailer");

const { FRONTEND_URL } = process.env.VITE_APP_FRONTEND_URL;
const { SMTP_USER } = process.env.SMTP_USER;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: `${SMTP_USER}`,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendForgottenPassword = (req, res) => {
  transporter.sendMail(
    {
      from: SMTP_USER,
      to: req.user.email,
      subject: "Mot de passe oublié",
      text: "Pour créer un nouveau mot de passe, cliquez ici !",
      html: `<p>Pour créer un nouveau mot de passe, <a href="${FRONTEND_URL}/reset-password/${req.user.passwordToken}">cliquez ici !</a>
      </br>Attention, ce lien n'est valable que pendant 5 minutes!</p>`,
    },
    (err) => {
      if (err) {
        res.sendStatus(500);
      } else res.sendStatus(200);
    }
  );
};

module.exports = { sendForgottenPassword };

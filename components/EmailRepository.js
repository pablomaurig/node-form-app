const nodemailer = require('nodemailer');
const path = require('path');
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, } = process.env;

const oConfig = {
  "host": EMAIL_HOST,
  "port": EMAIL_PORT,
  "auth": {
    "type": "login",
    "user": EMAIL_USER,
    "pass": EMAIL_PASS
  }
};

const transport = nodemailer.createTransport(oConfig);

const makeEmail = (user) => ({
  from: EMAIL_USER,
  to: EMAIL_USER,
  subject: "Formulario de consulta",
  //TODO cambiar el cuerpo del mail
  //${user.first_name}
  //http://10.108.14.178:3000/confirm=${user.emailToken} ${user.email}
  html: (`Hola pablo`)
});


exports.sendValidateUserMail = async (user) => {
  const oMail = makeEmail(user);
  try {
    transport.sendMail(oMail, (error, info) => {
      let message = error ? "Error al enviar email" : "Correo enviado exitosamente";
      console.log(message);
      transport.close();
    });
  } catch (e) {
    console.log(e);
  }
};
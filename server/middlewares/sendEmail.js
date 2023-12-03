import nodeMailer from "nodemailer"

export const sendEmail = async (options) => {
  var transporter = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "313982eeac7dfd",
      pass: "c4182683ef75d3",
    },
  })
  //   const transporter = nodeMailer.createTransport({
  //     host: "smtp.mailtrap.io",
  //     port: 2525,
  //     auth: {
  //       user: "211d4679e3d79c",
  //       pass: "9e2b7d43009e26",
  //     },
  //   })

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  await transporter.sendMail(mailOptions)
}

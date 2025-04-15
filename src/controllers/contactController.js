import nodemailer from "nodemailer";

export const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      data: null,
      message: "All fields are required",
      error: "Missing fields"
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'grant38@ethereal.email',
        pass: 'qrSqfHEhjrwNj8z3cb',
      }
    });

    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'admin@example.com',
      subject: "Contact Form Message",
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    return res.status(200).json({
      data: {
        previewUrl: nodemailer.getTestMessageUrl(info),
      },
      message: "Message sent successfully",
      error: null
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: "Failed to send message",
      error: error.message
    });
  }
};

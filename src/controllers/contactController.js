import nodemailer from 'nodemailer';

// Updated with your new Ethereal credentials
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'delbert.shields@ethereal.email', // Your new Ethereal username
        pass: 'MHH8Wp68cjB4EzQ2yY' // Your new Ethereal password
    }
});

export const sendEmail = async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Input validation
    if (!name || !email || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'Name, email and message are required' 
        });
    }

    try {
        const info = await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: 'personalemail@gmail.com', // Keep your real email here
            subject: 'New Contact Form Submission',
            text:` Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2 style="color: #1a3e72;">New Contact Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                    <p><strong>Message:</strong></p>
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                </div>
            `
        });

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.status(200).json({ 
            success: true, 
            message: 'Email sent successfully',
            previewUrl: nodemailer.getTestMessageUrl(info) // Helpful for testing
        });
    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to send email',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
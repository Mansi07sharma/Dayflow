export const sendVerificationEmail = async (userEmail, token) => {
  const verifyURL = `http://localhost:3000/api/auth/verify-email/${token}`;

  await transporter.sendMail({
    from: '"Your App" <no-reply@yourapp.com>',
    to: userEmail,
    subject: "Verify your email",
    html: `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${verifyURL}">Verify Email</a>
      <p>This link expires in 15 minutes.</p>
    `
  });
};

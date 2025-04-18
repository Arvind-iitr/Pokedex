import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sigma.developer.iitr@gmail.com',
      pass: 'igsf kqmc pxux utjq'
    }
});

export const generateWelcomeEmail = (username) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Welcome to PokéVerse</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0d0d0d;
      font-family: 'Segoe UI', sans-serif;
      color: #fff;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background-color: #1a1a1a;
      border: 2px solid #FFD700;
      border-radius: 10px;
      overflow: hidden;
    }
    .header {
      background-color: #1E90FF;
      padding: 20px;
      text-align: center;
      color: #fff;
    }
    .header img {
      width: 80px;
    }
    .content {
      padding: 30px 20px;
      text-align: center;
    }
    .content h1 {
      color: #FFD700;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 25px;
      background-color: #FFD700;
      color: #000;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      transition: background 0.3s;
    }
    .btn:hover {
      background-color: #ffc400;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #aaa;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Welcome to Pokedex!</h2>
    </div>
    <div class="content">
      <h1>Hey Trainer, <span style="color: #1E90FF;">${username}</span>!</h1>
      <p>We're thrilled to have you on board. Your Pokémon journey begins now! Catch 'em, trade 'em, and battle with trainers across the globe.</p>
      <div class="footer">
        <p>If you didn’t create this account, you can safely ignore this email.</p>
        <p>© 2025 PokéVerse. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const generateOTPEmail = (username, otp) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Your PokéVerse OTP</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0d0d0d;
      font-family: 'Segoe UI', sans-serif;
      color: #fff;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background-color: #1a1a1a;
      border: 2px solid #FFD700;
      border-radius: 10px;
      overflow: hidden;
    }
    .header {
      background-color: #1E90FF;
      padding: 20px;
      text-align: center;
      color: #fff;
    }
    .header img {
      width: 80px;
    }
    .content {
      padding: 30px 20px;
      text-align: center;
    }
    .content h1 {
      color: #FFD700;
    }
    .otp-box {
      display: inline-block;
      background-color: #FFD700;
      color: #000;
      padding: 15px 25px;
      font-size: 24px;
      font-weight: bold;
      border-radius: 10px;
      margin-top: 20px;
      letter-spacing: 3px;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #aaa;
      padding: 10px 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" alt="PokéLogo" />
      <h2>PokéVerse OTP Verification</h2>
    </div>
    <div class="content">
      <h1>Hi <span style="color: #1E90FF;">${username}</span>!</h1>
      <p>Your one-time password (OTP) for verifying your email address is:</p>
      <div class="otp-box">${otp}</div>
      <p style="margin-top: 20px;">This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
      <div class="footer">
        <p>If you didn’t request this, you can safely ignore this email.</p>
        <p>© 2025 PokéVerse. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>`;


export const generateResetPasswordEmail = (username, otp) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>PokéVerse - Reset Password OTP</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0d0d0d;
      font-family: 'Segoe UI', sans-serif;
      color: #fff;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background-color: #1a1a1a;
      border: 2px solid #FFD700;
      border-radius: 10px;
      overflow: hidden;
    }
    .header {
      background-color: #1E90FF;
      padding: 20px;
      text-align: center;
      color: #fff;
    }
    .header img {
      width: 80px;
    }
    .content {
      padding: 30px 20px;
      text-align: center;
    }
    .content h1 {
      color: #FFD700;
    }
    .otp-box {
      display: inline-block;
      margin: 20px 0;
      padding: 15px 25px;
      background-color: #FFD700;
      color: #000;
      font-size: 24px;
      font-weight: bold;
      border-radius: 10px;
      letter-spacing: 4px;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #aaa;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" alt="PokéLogo" />
      <h2>PokéVerse Password Reset</h2>
    </div>
    <div class="content">
      <h1>Hey <span style="color: #1E90FF;">${username}</span>,</h1>
      <p>We received a request to reset your password. Use the OTP below to proceed:</p>
      <div class="otp-box">${otp}</div>
      <p>This OTP is valid for only a few minutes. If you didn’t request this, you can ignore this email.</p>
      <div class="footer">
        <p>Stay secure, Trainer.</p>
        <p>© 2025 PokéVerse. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

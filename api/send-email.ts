// // api/send-email.ts
// import type { VercelRequest, VercelResponse } from "@vercel/node";
// import nodemailer from "nodemailer";
// import { rateLimit } from "../lib/rateLimit";

// type Payload = {
//   name?: string;
//   email?: string;
//   subject?: string;
//   message?: string;
//   hp?: string; // honeypot
// };

// const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || "6", 10); // max requests per window
// const RATE_LIMIT_WINDOW_MIN = parseInt(
//   process.env.RATE_LIMIT_WINDOW_MIN || "60",
//   10
// ); // minutes

// function safeText(s: unknown) {
//   if (!s && s !== 0) return "";
//   const str = String(s);
//   // Basic sanitize: remove suspicious long strings and control chars
//   return str.replace(/[\u0000-\u001F\u007F]/g, "").slice(0, 2000);
// }

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   try {
//     if (req.method !== "POST") {
//       res.status(405).json({ error: "Method not allowed" });
//       return;
//     }

//     // Basic body size guard
//     if (!req.body || Object.keys(req.body).length === 0) {
//       res.status(400).json({ error: "Empty request" });
//       return;
//     }

//     // Rate limit by IP
//     const ip = (
//       req.headers["x-forwarded-for"] ||
//       req.socket.remoteAddress ||
//       ""
//     )
//       .toString()
//       .split(",")[0]
//       .trim();
//     const limiterOk = rateLimit(
//       ip,
//       RATE_LIMIT_MAX,
//       RATE_LIMIT_WINDOW_MIN * 60 * 1000
//     );
//     if (!limiterOk) {
//       res.status(429).json({ error: "Too many requests — try again later" });
//       return;
//     }

//     const body = req.body as Payload;

//     // Honeypot (if filled -> likely bot)
//     if (body.hp && body.hp.trim().length > 0) {
//       // intentionally return success to confuse bots while not delivering mail
//       res.status(200).json({ ok: true });
//       return;
//     }

//     const name = safeText(body.name || "Anonymous");
//     const fromEmail = safeText(body.email || "");
//     const subject = safeText(body.subject || `Portfolio contact from ${name}`);
//     const message = safeText(body.message || "");

//     if (!fromEmail || !message) {
//       res.status(400).json({ error: "Missing required fields" });
//       return;
//     }

//     // Load SMTP config from env
//     const SMTP_HOST = process.env.SMTP_HOST;
//     const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
//     const SMTP_USER = process.env.SMTP_USER;
//     const SMTP_PASS = process.env.SMTP_PASS;
//     const TO_EMAIL = process.env.TO_EMAIL; // destination (your inbox)
//     const FROM_NAME = process.env.FROM_NAME || "Portfolio Contact";

//     if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !TO_EMAIL) {
//       console.error("SMTP not configured correctly");
//       res.status(500).json({ error: "Mail server not configured" });
//       return;
//     }

//     // Create transporter
//     const transporter = nodemailer.createTransport({
//       host: SMTP_HOST,
//       port: SMTP_PORT,
//       secure: SMTP_PORT === 465, // true for 465
//       auth: {
//         user: SMTP_USER,
//         pass: SMTP_PASS,
//       },
//     });

//     // Compose message
//     const plainText = [
//       `You have a new message from your portfolio contact form.`,
//       ``,
//       `Name: ${name}`,
//       `Email: ${fromEmail}`,
//       `Subject: ${subject}`,
//       ``,
//       `Message:`,
//       `${message}`,
//       ``,
//       `Sender IP: ${ip}`,
//       `Timestamp: ${new Date().toISOString()}`,
//     ].join("\n");

//     const html = `
//       <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color: #111;">
//         <h2>New contact form submission</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${fromEmail}</p>
//         <p><strong>Subject:</strong> ${subject}</p>
//         <hr />
//         <p><strong>Message:</strong></p>
//         <div style="white-space:pre-wrap;">${message
//           .replace(/</g, "&lt;")
//           .replace(/>/g, "&gt;")}</div>
//         <hr />
//         <p style="font-size:12px;color:#666">IP: ${ip} • ${new Date().toLocaleString()}</p>
//       </div>
//     `;

//     const mailOptions = {
//       from: `"${FROM_NAME}" <${SMTP_USER}>`,
//       to: TO_EMAIL,
//       replyTo: fromEmail,
//       subject,
//       text: plainText,
//       html,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ ok: true });
//   } catch (err) {
//     console.error("send-email error:", err);
//     res.status(500).json({ error: "Failed to send message" });
//   }
// }

// src/components/Contact.tsx
import React, { useState } from "react";

type Props = {
    phone?: string;
    email?: string;
    // choose mode: "emailjs" | "server" (server = POST /api/send-email)
    mode?: "emailjs" | "server";
};

export default function Contact({
    phone = "+91-XXXXXXXXXX",
    email = "youremail@example.com",
    mode = "emailjs",
}: Props) {
    const [name, setName] = useState("");
    const [fromEmail, setFromEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState < null | "success" | "error" > (null);

    // honeypot - bots will fill this; humans won't see it
    const [hp, setHp] = useState("");

    // basic client validation
    const valid = name.trim() && fromEmail.trim() && message.trim();

    const resetForm = () => {
        setName("");
        setFromEmail("");
        setSubject("");
        setMessage("");
        setHp("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);

        if (hp.trim()) {
            // spam
            return;
        }
        if (!valid) {
            setStatus("error");
            return;
        }

        setLoading(true);

        try {
            if (mode === "emailjs") {
                // EMAILJS: requires you to add EmailJS script and set env vars
                // We'll call window.emailjs.send with serviceId, templateId, and templateParams
                // See instructions below to configure EmailJS account and env.
                // @ts-ignore
                if (!window.emailjs) {
                    throw new Error("EmailJS not loaded");
                }

                const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
                const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
                const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

                if (!serviceId || !templateId || !publicKey) {
                    throw new Error("EmailJS keys not configured in environment");
                }

                // @ts-ignore
                await window.emailjs.send(
                    serviceId,
                    templateId,
                    {
                        from_name: name,
                        from_email: fromEmail,
                        subject: subject || "Portfolio contact",
                        message,
                    },
                    publicKey
                );

                setStatus("success");
                resetForm();
            } else {
                // server mode: POST to /api/send-email
                const res = await fetch("/api/send-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email: fromEmail, subject, message }),
                });
                if (!res.ok) throw new Error("Failed to send");
                setStatus("success");
                resetForm();
            }
        } catch (err) {
            // fallback: open mail client via mailto (user-visible)
            try {
                const mailto = `mailto:${encodeURIComponent(
                    email
                )}?subject=${encodeURIComponent(subject || "Contact from portfolio")}&body=${encodeURIComponent(
                    `Name: ${name}\nEmail: ${fromEmail}\n\n${message}`
                )}`;
                window.location.href = mailto;
                setStatus("success");
                resetForm();
            } catch (e) {
                setStatus("error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" aria-label="Contact" className="py-12">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
                    Contact Me
                </h2>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: contact details */}
                    <div
                        className="p-5 rounded-xl"
                        style={{
                            background: "var(--card-bg)",
                            border: "1px solid var(--glass-border)",
                            boxShadow: "var(--card-shadow)",
                        }}
                    >
                        <div className="mb-4">
                            <div className="text-sm text-gray-300">Phone</div>
                            <div className="text-base font-medium" style={{ color: "var(--text-primary)" }}>
                                <a href={`tel:${phone}`} className="hover:underline">
                                    {phone}
                                </a>
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-300">Email</div>
                            <div className="text-base font-medium" style={{ color: "var(--text-primary)" }}>
                                <a href={`mailto:${email}`} className="hover:underline">
                                    {email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right: form */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-5 rounded-xl"
                        style={{
                            background: "var(--card-bg)",
                            border: "1px solid var(--glass-border)",
                            boxShadow: "var(--card-shadow)",
                        }}
                        noValidate
                    >
                        {/* honeypot - visually hidden */}
                        <label style={{ display: "none" }}>
                            Don’t fill this (anti-spam)
                            <input name="hp" value={hp} onChange={(e) => setHp(e.target.value)} />
                        </label>

                        <div className="grid grid-cols-1 gap-3">
                            <label className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                Name
                                <input
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full rounded-md px-3 py-2"
                                    style={{
                                        background: "var(--card-bg-soft)",
                                        border: "1px solid var(--glass-border)",
                                        color: "var(--text-primary)",
                                    }}
                                />
                            </label>

                            <label className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                Email
                                <input
                                    required
                                    type="email"
                                    value={fromEmail}
                                    onChange={(e) => setFromEmail(e.target.value)}
                                    className="mt-1 block w-full rounded-md px-3 py-2"
                                    style={{
                                        background: "var(--card-bg-soft)",
                                        border: "1px solid var(--glass-border)",
                                        color: "var(--text-primary)",
                                    }}
                                />
                            </label>

                            <label className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                Subject
                                <input
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="mt-1 block w-full rounded-md px-3 py-2"
                                    style={{
                                        background: "var(--card-bg-soft)",
                                        border: "1px solid var(--glass-border)",
                                        color: "var(--text-primary)",
                                    }}
                                />
                            </label>

                            <label className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                Message
                                <textarea
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={5}
                                    className="mt-1 block w-full rounded-md px-3 py-2"
                                    style={{
                                        background: "var(--card-bg-soft)",
                                        border: "1px solid var(--glass-border)",
                                        color: "var(--text-primary)",
                                    }}
                                />
                            </label>

                            <div className="flex items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 rounded-md text-sm font-medium"
                                    style={
                                        {
                                            background: "linear-gradient(90deg,var(--accent-1),var(--accent-2))",
                                            color: "#041027",
                                            border: "none",
                                        } as React.CSSProperties
                                    }
                                >
                                    {loading ? "Sending…" : "Send Message"}
                                </button>

                                <a
                                    href={`mailto:${email}`}
                                    className="text-sm px-3 py-2 rounded-md"
                                    style={{
                                        background: "var(--btn-secondary-bg, rgba(255,255,255,0.03))",
                                        color: "var(--text-primary)",
                                        border: "1px solid var(--btn-border, rgba(255,255,255,0.06))",
                                    }}
                                >
                                    Or open mail client
                                </a>

                                {status === "success" && (
                                    <div className="text-sm text-green-400">Thanks — message sent.</div>
                                )}
                                {status === "error" && (
                                    <div className="text-sm text-rose-400">Something went wrong. Try mailto.</div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

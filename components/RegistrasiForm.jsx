"use client";

import { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import Link from "next/link";
import { register } from "@/api/api";
import { useRouter } from "next/navigation";

// Palet: dasar putih, variasi dari #1E4FA3
// #1E4FA3 utama | #173D80 hover/gelap | #EAF0FA tint | #C9D6EC garis

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = "Nama lengkap wajib diisi.";
    if (!email.trim()) next.email = "Email wajib diisi.";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      next.email = "Format email belum benar.";
    if (!password) next.password = "Kata sandi wajib diisi.";
    else if (password.length < 8)
      next.password = "Kata sandi minimal 8 karakter.";
    if (!agree) next.agree = "Kamu perlu menyetujui syarat dan ketentuan.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setLoading(true);

    try {
      const res = await register({ name, email, password });
      if (res && res.message === "User registered successfully") {
        alert("Registrasi berhasil! Silakan masuk dengan akun Anda.");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }

      await new Promise((r) => setTimeout(r, 800));
      console.log("Register:", { name, email, password, agree });
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Kekuatan kata sandi sederhana (0-4)
  const strength = (() => {
    const p = password;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthLabel = ["", "Lemah", "Cukup", "Baik", "Kuat"][strength];

  const inputClass = (hasError) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-4 ${
      hasError
        ? "border-red-500 focus:ring-red-100"
        : "border-[#C9D6EC] focus:border-[#1E4FA3] focus:ring-[#1E4FA3]/15"
    }`;

  return (
    <main className="flex min-h-screen bg-white">
      {/* Panel kiri (desktop) */}
      <aside className="hidden w-1/2 flex-col justify-between bg-[#1E4FA3] p-12 text-white lg:flex">
        <span className="text-xl font-bold tracking-tight">Tokoku</span>
        <div>
          <h2 className="max-w-sm text-4xl font-bold leading-tight">
            Buat akun, mulai belanja dalam hitungan menit.
          </h2>
          <p className="mt-4 max-w-sm text-base text-white/75">
            Simpan alamat pengiriman dan pantau pesananmu di satu tempat.
          </p>
        </div>
        <div className="h-1 w-16 rounded-full bg-[#EAF0FA]" />
      </aside>

      {/* Form */}
      <section className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-[#1E4FA3]">Daftar akun</h1>
          <p className="mt-2 text-sm text-slate-600">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#1E4FA3] hover:text-[#173D80] hover:underline"
            >
              Masuk
            </Link>
          </p>

          {errors.form && (
            <div
              role="alert"
              className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errors.form}
            </div>
          )}

          <Form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            <Form.Group id="name" label="Nama lengkap" error={errors.name}>
              <Form.Control
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Masukan nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClass(errors.name)}
              />
            </Form.Group>

            <Form.Group id="email" label="Email" error={errors.email}>
              <Form.Control
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass(errors.email)}
              />
            </Form.Group>

            <Form.Group
              id="password"
              label="Kata sandi"
              error={errors.password}
            >
              <div className="relative">
                <Form.Control
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className={`${inputClass(errors.password)} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-lg text-slate-500 hover:text-[#1E4FA3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4FA3]"
                >
                  <EyeIcon off={showPassword} />
                </button>
              </div>

              {password && (
                <div
                  className="mt-2.5 flex items-center gap-3"
                  aria-live="polite"
                >
                  <div className="flex flex-1 gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i <= strength ? "bg-[#1E4FA3]" : "bg-[#EAF0FA]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="w-12 text-right text-xs font-medium text-[#1E4FA3]">
                    {strengthLabel}
                  </span>
                </div>
              )}
            </Form.Group>

            <div>
              <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="agree"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#C9D6EC] accent-[#1E4FA3]"
                />
                <span>
                  Saya menyetujui{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-[#1E4FA3] hover:underline"
                  >
                    syarat dan ketentuan
                  </Link>{" "}
                  serta{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-[#1E4FA3] hover:underline"
                  >
                    kebijakan privasi
                  </Link>
                  .
                </span>
              </label>
              {errors.agree && (
                <p className="mt-1.5 text-xs text-red-600">{errors.agree}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#1E4FA3] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#173D80] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1E4FA3]/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Daftar"}
            </button>
          </Form>
        </div>
      </section>
    </main>
  );
}

// Dideklarasikan di luar komponen agar input tidak kehilangan fokus saat mengetik
function Field({ id, label, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-800"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function EyeIcon({ off }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M3 3l18 18" />}
    </svg>
  );
}

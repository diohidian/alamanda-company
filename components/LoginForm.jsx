"use client";

import { useState } from "react";
import Link from "next/link";
import { Col, Form, Row, Button } from "react-bootstrap";
import { loginAuth } from "@/api/api";
import { useRouter } from "next/navigation";
import { setCookie } from "@/utils/cookies";
import { useCart } from "@/context/CartContext";

// Palet: dasar putih, variasi dari #1E4FA3
// #1E4FA3 utama | #173D80 hover/gelap | #EAF0FA tint | #C9D6EC garis

export default function LoginPage() {
  const router = useRouter(); // dipindah ke sini
  const { loginUser } = useCart();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = "Email wajib diisi.";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      next.email = "Format email belum benar.";
    if (!password) next.password = "Kata sandi wajib diisi.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    try {
      const res = await loginAuth({ email, password }); // login, bukan LoginPage
      if (res.message === "succes login!") {
        
        alert("Login Berhasil!");
        setCookie("userData", JSON.stringify(res.data), {
          expires: 1
        })
        loginUser(res.data);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err) {
      setErrors({
        form: err.response?.data?.message || "Email atau kata sandi salah.",
      });
    } finally {
      setLoading(false);
    }
  };

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
            Belanja lebih mudah, langsung dari keranjang.
          </h2>
          <p className="mt-4 max-w-sm text-base text-white/75">
            Masuk untuk melihat pesanan, menyimpan alamat, dan checkout lebih
            cepat.
          </p>
        </div>
        <div className="h-1 w-16 rounded-full bg-[#EAF0FA]" />
      </aside>

      {/* Form */}
      <section className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-[#1E4FA3]">Masuk</h1>
          <p className="mt-2 text-sm text-slate-600">
            Belum punya akun?{" "}
            <Link
              href="/registrasi"
              className="font-semibold text-[#1E4FA3] hover:text-[#173D80] hover:underline"
            >
              Daftar sekarang
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
            <Form.Group>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-800"
              >
                Email
              </label>
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
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-600">
                  {errors.email}
                </p>
              )}
            </Form.Group>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-800"
                >
                  Kata sandi
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#1E4FA3] hover:text-[#173D80] hover:underline"
                >
                  Lupa kata sandi?
                </Link>
              </div>
              <Form.Group className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Masukkan kata sandi"
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
              </Form.Group>
              {errors.password && (
                <p id="password-error" className="mt-1.5 text-xs text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#1E4FA3] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#173D80] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1E4FA3]/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </Form>

          <div className="my-7 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-[#C9D6EC]" />
            atau
            <span className="h-px flex-1 bg-[#C9D6EC]" />
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#1E4FA3] bg-white px-4 py-3 text-sm font-semibold text-[#1E4FA3] transition hover:bg-[#EAF0FA] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1E4FA3]/20"
          >
            Lanjutkan dengan Google
          </button>
        </div>
      </section>
    </main>
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

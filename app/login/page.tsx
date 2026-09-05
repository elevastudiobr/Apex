"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setMessage("");
    setSuccess(false);

    // 1. Faz o login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // 2. Verifica se o login foi realizado
    if (error || !data.user) {
      setMessage("Email ou senha incorretos.");
      setSuccess(false);
      setLoading(false);
      return;
    }

    const user = data.user;

    // 3. Verifica se o usuário já possui um perfil
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    // 4. Caso aconteça algum erro ao consultar o perfil
    if (profileError) {
      console.error("PROFILE CHECK ERROR:", profileError);

      setMessage("Não foi possível verificar seu perfil.");
      setSuccess(false);
      setLoading(false);
      return;
    }

    // 5. Usuário já possui perfil
    if (profile) {
      setMessage(
        "Login realizado com sucesso! Abrindo seu dashboard..."
      );
      setSuccess(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);

      return;
    }

    // 6. Usuário ainda não possui perfil
    setMessage(
      "Login realizado com sucesso! Vamos configurar seu perfil..."
    );
    setSuccess(true);

    setTimeout(() => {
      router.push("/onboarding");
    }, 800);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
      {/* Glow de fundo */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[180px]" />

      {/* Card */}
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-[0_0_100px_rgba(37,99,235,0.18)] backdrop-blur-xl">
        {/* Cabeçalho */}
        <div className="mb-8 text-center">
          <Image
            src="/logo.png"
            alt="Apex"
            width={56}
            height={56}
            className="mx-auto"
          />

          <h1 className="mt-6 text-3xl font-bold">
            Entrar
          </h1>

          <p className="mt-2 text-zinc-400">
            Continue sua evolução com o Apex.
          </p>
        </div>

        {/* Formulário */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="text-sm text-zinc-400">
              Email
            </label>

            <input
              type="email"
              placeholder="seuemail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Senha */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">
                Senha
              </label>

              <Link
                href="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Esqueci minha senha
              </Link>
            </div>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Mensagem */}
        {message && (
          <p
            className={`mt-5 text-center text-sm font-medium ${
              success
                ? "text-blue-400"
                : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        {/* Criar conta */}
        <p className="mt-6 text-center text-sm text-zinc-500">
          Ainda não tem conta?{" "}
          <Link
            href="/register"
            className="text-blue-400 hover:text-blue-300"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  );
}
'use client'
import { Metadata } from "next"
import Image from "next/image"

import Login from "@/components/Login"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <div suppressHydrationWarning className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-400" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image src="/logo.png" alt="Logotipo" width={120} height={80} />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;A logística é o melhor caminho entre dois pontos&rdquo;
            </p>
            <footer className="text-sm">Prof. Éric Guimarães - Professor & Palestrante</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Entre na sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Digite o e-mail e senha para acessar a plataforma.
            </p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  )
}
import CreateProduct from "@/components/CreateProduct";
import Head from "next/head";
import Link from "next/link";
import React, { Children } from "react";
import { destroyCookie } from 'nookies'
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

type MainLayoutProps = {
  children: React.ReactNode;
}


export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const handleLogout = () => {
    destroyCookie(null, 'isAutenticated')
    router.push('/login')
  }

  return (
    <>
      <Head>
        <title>StockMaster</title>
        <link rel="shortcut icon" href="icon.ico" />
      </Head>

      <div className="top-bar">
        <div className="nav mt-4 mr-4 flex flex-row gap-2 justify-end">
          <Button variant="ghost" asChild>
            <Link href="/">Início</Link>
          </Button>
          <CreateProduct />
          <Button onClick={handleLogout} variant="ghost">Sair</Button>
        </div>

        <img
          id="title"
          src="logo.png"
          alt="pet care logo"
        ></img>
      </div>
      <div className="wrapper grid">
        {children}
      </div>
    </>
  )
}

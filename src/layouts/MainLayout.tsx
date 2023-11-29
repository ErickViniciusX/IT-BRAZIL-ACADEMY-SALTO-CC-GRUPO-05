import CreateProduct from "@/components/CreateProduct";
import Head from "next/head";
import Link from "next/link";
import React, { Children } from "react";

type MainLayoutProps = {
  children: React.ReactNode;
}


export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>StockMaster</title>
        <link rel="shortcut icon" href="icon.ico" />
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">Inicio</Link>
          <CreateProduct />
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

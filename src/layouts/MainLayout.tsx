import Link from "next/link";
import React, { Children } from "react";

type MainLayoutProps = { 
    children: React.ReactNode;
 }


export default function MainLayout ({children}:MainLayoutProps) {
    return (
        <>
          <div className="top-bar">
            <div className="nav">
              <Link href="/">Inicio</Link>
              <Link href="/new">Adicionar</Link>
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

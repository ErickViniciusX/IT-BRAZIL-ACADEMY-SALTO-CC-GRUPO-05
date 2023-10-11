import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Link from 'next/link'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>StockMaster</title>
        <link rel="shortcut icon" href="icon.ico" />
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">Inicio</Link>
          <Link href="/new">Adicionar</Link>
        </div>

        <img
          id="title"
          src="Logo.png"
          alt="pet care logo"
        ></img>
      </div>
      <div className="wrapper grid">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp


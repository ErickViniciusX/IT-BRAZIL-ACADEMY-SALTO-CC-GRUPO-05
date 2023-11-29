import '../css/style.css'
import '../css/form.css'
import '../css/global.css'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import CreateProduct from '@/components/CreateProduct'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

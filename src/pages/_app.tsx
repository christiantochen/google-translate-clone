import Head from 'next/head'
import type { AppProps } from 'next/app'

import "@styles/global.scss"

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Translate</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Component {...pageProps} />
            </main>
        </>
    )

}
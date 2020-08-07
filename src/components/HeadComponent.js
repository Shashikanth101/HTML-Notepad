import Head from 'next/head'

export default function HeadComponent({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/icons/Document.ico" />
    </Head>
  )
}
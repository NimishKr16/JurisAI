import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>JURISAI</title>
        <meta name="description" content="Next.js Firebase Authentication" />
      </Head>

      <h1 className="text-3xl font-bold">Welcome to JURISAI</h1>

      <button
        onClick={() => router.push("/login")}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
      >
        Login
      </button>
    </div>
  );
}

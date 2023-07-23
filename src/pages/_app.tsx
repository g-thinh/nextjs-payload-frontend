import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider, useAuth } from "src/providers/AuthProvider";
import { Header } from "src/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  const { isLoading } = useAuth();
  return (
    <AuthProvider>
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 p-4">
          <Component {...pageProps} />
        </main>
        <footer className="p-4 text-center bg-gray-800 text-gray-50">
          Powered by Vercel and Payload
        </footer>
      </div>
    </AuthProvider>
  );
}

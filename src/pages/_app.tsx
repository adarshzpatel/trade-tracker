import type { AppProps } from "next/app";
import "../styles/globals.css";
import { GlobalContextProvider } from "@/contexts/GlobalContext";

export default function App({ Component, pageProps }: AppProps) {
  return<GlobalContextProvider>
    <div className="bg-gray-100 p-8 h-screen w-full">
      <Component {...pageProps} />
    </div>
  </GlobalContextProvider>;
}

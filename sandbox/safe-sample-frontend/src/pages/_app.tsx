import "@/styles/globals.css";
import { AppProps } from "next/app";


/**
 * App Component
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}
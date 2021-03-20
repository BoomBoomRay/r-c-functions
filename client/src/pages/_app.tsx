import { AppProps } from "next/app";
import axios from "axios";
import { useRouter } from "next/router";

import "../styles/tailwind.css";

import { NavBar } from "../components/NavBar";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);
  return (
    <>
      {!authRoute && <NavBar />}
      <Component {...pageProps} />
    </>
  );
}

export default App;

import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import Inputgroup from "../components/InputGroup";
import { useRouter } from "next/router";

export default function Home() {
  const [state, setState] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<any>({});

  const router = useRouter();

  const handleInput = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post("/auth/login", state);
      router.push("/");
    } catch (error) {
      setErrors(error.response.data);
    }
    setState({ username: "", password: "" });
  };
  return (
    <div className="flex bg-white">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="w-40 h-screen bg-center bg-cover"
        style={{ backgroundImage: "url('/images/bgBricks.jpg')" }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Login</h1>
          <form onSubmit={handleSubmit}>
            <Inputgroup
              setValue={handleInput}
              type="text"
              name="username"
              value={state.username}
              className="mb-2"
              placeholder="Username"
              error={errors.username}
            />
            <Inputgroup
              setValue={handleInput}
              type="password"
              name="password"
              value={state.password}
              className="mb-4"
              placeholder="Password"
              error={errors.password}
            />
            <button
              onClick={handleSubmit}
              className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded"
            >
              Login
            </button>
          </form>
          <small>
            Don't have an account ?
            <Link href="/register">
              <a className="ml-1 text-blue-500 uppercase">Register</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

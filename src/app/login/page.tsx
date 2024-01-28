// Login.js
"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const toggleAuthMode = () => {};
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const isLogin = false;
  const router = useRouter();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        body: JSON.stringify(state),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      });
      const res = await response.json();
      if (!res.token) {
        setError(res.message);
      } else {
        setError("");
        router.push("/dashboard");
      }
      console.log(res);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
  };
  const onChange = (e: any) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log({ error });

  return (
    <section className="h-screen flex items-center dark:text-gray-300">
      <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-700 rounded-md shadow-md text-gray-800">
        <h2 className="text-2xl font-semibold mb-6 dark:text-gray-300">
          Login
        </h2>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 dark:text-gray-300 "
        >
          <label className="flex flex-col">
            Email:
            <input
              name="email"
              type="email"
              onChange={onChange}
              className="border border-gray-500 outline-none p-2 rounded-md dark:bg-gray-500 bg-gray-100 dark:text-gray-300 text-gray-800"
            />
          </label>
          <label className="flex flex-col">
            Password:
            <input
              name="password"
              type="password"
              onChange={onChange}
              className="border border-gray-500 outline-none p-2 rounded-md dark:bg-gray-500 bg-gray-100 dark:text-gray-300 text-gray-800"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-600">{error}</p>}
        <p className="mt-4 dark:text-gray-300">
          Dont have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

// Signup.js
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {
  const toggleAuthMode = false;
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
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
  const onChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <section className="h-screen flex items-center dark:text-gray-300">
      <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-700 rounded-md shadow-md text-gray-800">
        <h2 className="text-2xl font-semibold mb-6 dark:text-gray-300">
          Signup
        </h2>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 dark:text-gray-300 "
        >
          <label className="flex flex-col ">
            Name:
            <input
              name="name"
              type="text"
              onChange={onChange}
              className="border border-gray-500 outline-none p-2 rounded-md dark:bg-gray-500 bg-gray-100 dark:text-gray-300 text-gray-800"
            />
          </label>
          <label className="flex flex-col">
            Email:
            <input
              type="email"
              name="email"
              onChange={onChange}
              className="border border-gray-500 outline-none p-2 rounded-md dark:bg-gray-500 bg-gray-100 dark:text-gray-300 text-gray-800"
            />
          </label>
          <label className="flex flex-col">
            Password:
            <input
              type="password"
              name="password"
              onChange={onChange}
              className="border border-gray-500 outline-none p-2 rounded-md dark:bg-gray-500 bg-gray-100 dark:text-gray-300 text-gray-800"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer"
          >
            Signup
          </button>
        </form>
        {error && <p className="text-red-600">{error}</p>}
        <p className="mt-4 dark:text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;

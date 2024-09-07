"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        alert("Signup successful! Check your email for verification.");
        setError(null);
      }
      console.log(data);
      setLoading(false);
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-1/3 border p-10 rounded text-center">
        <h1 className="text-3xl font-bold text-sky-600 mb-6">Create Account</h1>
        {error && (
          <h2 className="text-xl font-bold text-red-600 mb-4">{error}</h2>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="border w-full px-4 py-1 rounded"
            type="text"
            name="email"
            placeholder="Email"
          />
          <input
            className="border w-full px-4 py-1 rounded"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button
            className="w-full bg-sky-600 text-white rounded px-4 py-1 text-bold"
            disabled={loading}
          >
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1️⃣ Sign up with Supabase Auth
    
const { data, error: signUpError } = await supabase.auth.signUp({
  email,
  password,
});

if (signUpError) {
  setError(signUpError.message);
  setLoading(false);
  return;
}

if (!data.user) {
  setError("This email is already registered. Please log in instead.");
  setLoading(false);
  return;
}

    const user = data.user;

    // 2️⃣ Insert extra data into profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,        // MUST match auth.users.id
          email,
          username,
          phone,
          country,
        },
      ]);

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    alert("Signup successful! Check your email for confirmation.");
    router.push("/login");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          Create an Account
        </h1>

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-3 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border p-2 mb-3 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Country"
          className="w-full border p-2 mb-4 rounded"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:opacity-80"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

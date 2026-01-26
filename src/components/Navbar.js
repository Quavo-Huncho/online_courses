"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white">
          Learn<span className="text-blue-400">Hub</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-8 text-sm text-gray-300">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/courses" className="hover:text-white">Courses</Link>
          <Link href="/pricing" className="hover:text-white">Pricing</Link>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center space-x-4 text-sm">
          {!user ? (
            <>
              <Link
                href="/login"
                className="text-gray-300 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

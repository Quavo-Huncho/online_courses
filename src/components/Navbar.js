"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        {/* Logo */}
        <Link href="/" className="navbar-brand fw-bold text-white">
          <i className="bi bi-mortarboard me-2"></i>
          Learn<span className="text-primary">Hub</span>
        </Link>

        {/* Mobile toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          {/* Navigation links */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link 
                href="/" 
                className="nav-link text-white"
                onClick={handleLinkClick}
              >
                <i className="bi bi-house me-1"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/courses" 
                className="nav-link text-white"
                onClick={handleLinkClick}
              >
                <i className="bi bi-book me-1"></i>
                Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/pricing" 
                className="nav-link text-white"
                onClick={handleLinkClick}
              >
                <i className="bi bi-tag me-1"></i>
                Pricing
              </Link>
            </li>
          </ul>

          {/* Auth buttons */}
          <div className="navbar-nav">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="nav-link text-white me-2"
                  onClick={handleLinkClick}
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="btn btn-primary btn-sm"
                  onClick={handleLinkClick}
                >
                  <i className="bi bi-person-plus me-1"></i>
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light btn-sm dropdown-toggle"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {user.email?.split('@')[0]}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <Link 
                      href="/dashboard" 
                      className="dropdown-item"
                      onClick={handleLinkClick}
                    >
                      <i className="bi bi-speedometer2 me-2"></i>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/profile" 
                      className="dropdown-item"
                      onClick={handleLinkClick}
                    >
                      <i className="bi bi-person me-2"></i>
                      Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="dropdown-item text-danger"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

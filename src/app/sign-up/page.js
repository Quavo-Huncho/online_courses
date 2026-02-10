"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function signupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlesignup = async (e) => {
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

    alert("signup successful! Check your email for confirmation.");
    router.push("/login");
    setLoading(false);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            {/* Sign Up Card */}
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="bi bi-person-plus display-4 text-primary"></i>
                  </div>
                  <h1 className="h3 fw-bold mb-2">Create Account</h1>
                  <p className="text-muted">Join LearnHub and start your learning journey</p>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <div>{error}</div>
                  </div>
                )}

                {/* Sign Up Form */}
                <form onSubmit={handlesignup}>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label htmlFor="username" className="form-label">
                        <i className="bi bi-person me-1"></i>
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label htmlFor="email" className="form-label">
                        <i className="bi bi-envelope me-1"></i>
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label htmlFor="password" className="form-label">
                        <i className="bi bi-lock me-1"></i>
                        Password
                      </label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="password"
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </button>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label">
                        <i className="bi bi-telephone me-1"></i>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="+1234567890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="country" className="form-label">
                        <i className="bi bi-geo-alt me-1"></i>
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        placeholder="Your country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="terms"
                        required
                      />
                      <label className="form-check-label" htmlFor="terms">
                        I agree to the <Link href="/terms" className="text-primary">Terms of Service</Link> and <Link href="/privacy-policy" className="text-primary">Privacy Policy</Link>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full py-2"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating account...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        Sign Up
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="d-flex align-items-center my-4">
                  <hr className="flex-grow-1" />
                  <span className="px-3 text-muted">OR</span>
                  <hr className="flex-grow-1" />
                </div>

                {/* Social Sign Up */}
                <div className="d-grid gap-2">
                  <button className="btn btn-outline-secondary" type="button">
                    <i className="bi bi-google me-2"></i>
                    Sign up with Google
                  </button>
                  <button className="btn btn-outline-secondary" type="button">
                    <i className="bi bi-github me-2"></i>
                    Sign up with GitHub
                  </button>
                </div>

                {/* Login Link */}
                <p className="text-center mt-4 mb-0">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary text-decoration-none fw-semibold">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-4">
              <Link href="/" className="text-muted text-decoration-none">
                <i className="bi bi-arrow-left me-1"></i>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

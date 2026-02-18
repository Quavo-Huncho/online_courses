"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const accessToken = searchParams.get("access_token"); // Supabase sends token in URL

  useEffect(() => {
    if (!accessToken) {
      setError("Invalid or expired reset link.");
    }
  }, [accessToken]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Password updated successfully! ✅ Redirecting to login...");
    setLoading(false);

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="bi bi-mortarboard display-4 text-primary"></i>
                  </div>
                  <h1 className="h3 fw-bold mb-2">Reset Password</h1>
                  <p className="text-muted">Enter a new password to continue</p>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <div>{error}</div>
                  </div>
                )}

                {/* Success Alert */}
                {message && (
                  <div className="alert alert-success d-flex align-items-center animate__animated animate__fadeIn" role="alert">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    <div>{message}</div>
                  </div>
                )}

                <form onSubmit={handleUpdatePassword}>
                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      <i className="bi bi-lock me-1"></i>
                      New Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">
                      <i className="bi bi-lock-fill me-1"></i>
                      Confirm Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showConfirm ? "text" : "password"}
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                      >
                        <i className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading || !accessToken}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check2-circle me-2"></i>
                        Update Password
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center mt-4 mb-0">
                  Remembered your password?{" "}
                  <Link href="/login" className="text-primary text-decoration-none fw-semibold">
                    Login here
                  </Link>
                </p>
              </div>
            </div>

            <div className="text-center mt-4">
              <Link href="/" className="text-muted text-decoration-none">
                <i className="bi bi-arrow-left me-1"></i> Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Animate.css for smooth alerts */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
    </div>
  );
}

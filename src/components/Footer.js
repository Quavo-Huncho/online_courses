"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="footer text-white mt-5"
    >
      <div className="container py-5">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-4">
              <i className="bi bi-mortarboard me-2"></i>
              LearnHub
            </h5>
            <p className="text-muted">
              Learn programming, web development, and real-world tech skills
              with structured courses and guided lessons.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-muted">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="bi bi-instagram fs-5"></i>
              </a>
            </div>
          </div>

          {/* Platform */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase fw-bold mb-4">Platform</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/courses" className="text-muted text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Courses
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/pricing" className="text-muted text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Pricing
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/about" className="text-muted text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="text-muted text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase fw-bold mb-4">Account</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/login" className="text-muted text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Login
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/sign-up" className="text-muted text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Sign Up
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/dashboard" className="text-muted text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/profile" className="text-muted text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase fw-bold mb-4">Legal</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/privacy-policy" className="text-muted text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/terms" className="text-muted text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Terms of Service
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/refund" className="text-muted text-decoration-none">
                  <i className="bi bi-chevron-right me-1"></i>
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase fw-bold mb-4">Newsletter</h6>
            <p className="text-muted small mb-3">
              Subscribe to get updates on new courses and offers
            </p>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Your email"
                aria-label="Your email"
              />
              <button className="btn btn-primary" type="button">
                <i className="bi bi-send"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-secondary my-4" />

        {/* Bottom row */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted small mb-0">
              © {currentYear} LearnHub. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-muted small mb-0">
              Made with <i className="bi bi-heart-fill text-danger"></i> for learners
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

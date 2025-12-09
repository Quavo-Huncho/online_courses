"use client";
import Link from "next/link";
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Course Platform</h1>
      <p>
        Explore our <Link href="/courses">Courses</Link>
      </p>
    </div>
  );
}
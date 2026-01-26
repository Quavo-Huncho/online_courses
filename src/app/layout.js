import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100 min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="max-w-7xl mx-auto p-6 md:p-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

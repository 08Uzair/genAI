"use client";

import useAuthenticated from "@/hooks/useAuthenticated";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function HeroSection() {
  const router = useRouter();
  const { isAuthenticated } = useAuthenticated();
  const handleRoute = (path) => {
    router.push(path);
  };

  const handleLogOut = () => {
    localStorage.clear();
    toast.success("Logout Sucessfully");
    setTimeout(() => {
      router.push("/auth/login");
    }, 500);
  };
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-900">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-6 lg:px-12 py-6">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src="https://res.cloudinary.com/dyphiefiy/image/upload/v1748167114/09e2cd8d3a83b6e9cd4dc5d0d703a575-removebg-preview_skn1tk.png"
            alt="Logo"
            className="w-14 h-14 object-contain"
          />
          <span className="text-2xl font-bold hidden sm:inline">ChatStack</span>
        </a>

        {/* Auth Button */}
        <div>
          {isAuthenticated ? (
            <button
              onClick={handleLogOut}
              className="flex items-center gap-2 px-5 py-3 cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-800 text-lg"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          ) : (
            <button
              onClick={handleRoute("/auth/login")}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition text-lg"
            >
              <LogIn className="w-5 h-5" />
              Login
            </button>
          )}
        </div>
      </header>

      {/* Hero Content */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-24 grid lg:grid-cols-12 gap-16 items-center">
        {/* Left Content */}
        <div className="lg:col-span-6 space-y-8">
          <h1 className="text-6xl  font-extrabold leading-tight tracking-tight">
            Connect Instantly. <br /> Chat Seamlessly.
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl">
            Real-time messaging, secure conversations, and effortless
            collaboration — all in one sleek platform built for speed and
            privacy.
          </p>
          <div className="flex flex-wrap gap-6 pt-4">
            <Link
              href={isAuthenticated ? `/inbox` : `/auth/login`}
              className="inline-flex items-center px-7 py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold shadow transition"
            >
              Get Started
              <svg
                className="w-6 h-6 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L14.414 11H3a1 1 0 110-2h11.414l-4.121-4.121a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center px-7 py-4 text-gray-800 border border-gray-300 hover:bg-gray-100 rounded-xl text-lg font-semibold transition"
            >
              Register Now
            </Link>
          </div>
        </div>

        {/* Video Frame */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-3xl aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-gray-300">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Promotional Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

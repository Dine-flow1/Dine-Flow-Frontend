"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import Button from "../../components/ui/Buttons";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="flex items-center min-h-screen pt-20 pb-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-md p-8 mx-auto bg-white shadow-xl rounded-2xl">
            <div className="mb-8 text-center">
              <h1 className="mb-2 font-serif text-3xl font-bold text-shadow-amber-500">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to your RestaurantPro account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full" >
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <p className="px-4 text-sm text-gray-500">or continue with</p>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleGoogleLogin}
                variant="secondary"
                className="flex items-center justify-center w-full gap-3 border border-gray-300 hover:bg-gray-50"
              >
                <FcGoogle size={22} />
                Continue with Google
              </Button>

              {/* <Button
                onClick={handleFacebookLogin}
                variant="secondary"
                className="flex items-center justify-center w-full gap-3 text-white bg-blue-600 hover:bg-blue-700"
              >
                <FaFacebookF size={20} />
                Continue with Facebook
              </Button> */}
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary-600 hover:text-primary-700"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

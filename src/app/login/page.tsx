"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import Button from "../../components/ui/Buttons";
import { FcGoogle } from "react-icons/fc";
import { User, useAuth } from "../../Context/AuthContext";
import axios, { AxiosError } from "axios";

interface LoginResponse {
  success?: boolean;
  error?: boolean;
  message?: string;
  data?: {
    user?: User;
    token?: string;
  };
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const { login } = useAuth();

  const auth = useAuth();

  // Show success message if redirected from signup
  useEffect(() => {
    if (message === "signup_success") {
      setError("");
    }
  }, [message]);

  const redirectBasedOnRole = (role?: string) => {
    console.log(role);
    switch (role) {
      
      case "saasowner":
        router.push("/saasowner/dashboard");
        break;
      case "restaurant_owner":
        router.push("/restaurant-owners/dashboard");
        break;
      case "manager":
        router.push("/manager/dashboard");
        break;
      case "customer":
      case "user":
      default:
        router.push("/");
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const axiosResponse = await axios.post<LoginResponse>(
        "http://localhost:9999/api/auth/Login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = axiosResponse.data;

      if (!result || result.error || !result.success) {
        setError(result?.message || "Login failed. Please try again.");
        return;
      }

      const user = result.data?.user;
      const token = result.data?.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (user) {
        // Normalize role name fallback
        const normalizedUser = { ...user, role: user.role || "customer", name: user.name || user.email };
        localStorage.setItem("currentUser", JSON.stringify(normalizedUser));

        // Update AuthContext if available
        if (auth?.setCurrentUser) {
          try {
            auth.setCurrentUser(normalizedUser);
          } catch {
            // ignore
          }
        }
      }

      // Redirect based on role
      redirectBasedOnRole(user?.role || "customer");
    } catch (err) {
      console.error("Login error:", err);
      if (axios.isAxiosError(err)) {
        const axErr = err as AxiosError<any>;
        const msg = axErr.response?.data?.message || axErr.message || "Login failed. Please try again.";
        setError(msg);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      // Implement Google OAuth - this would redirect to your backend OAuth endpoint
      window.location.href = "http://localhost:9999/api/auth/google";
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="flex items-center min-h-screen pt-20 pb-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-md p-8 mx-auto bg-white shadow-xl rounded-2xl">
            <div className="mb-8 text-center">
              <h1 className="mb-2 font-serif text-3xl font-bold text-amber-600">
                Welcome Back
              </h1>
              <p className="text-gray-600">Sign in to your DineFlow account</p>
            </div>

            {error && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg">
                {error}
              </div>
            )}

            {message === "signup_success" && (
              <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 border border-green-200 rounded-lg">
                Account created successfully! Please login.
              </div>
            )}

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
                  className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
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
                  className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
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
                disabled={loading}
                type="button"
              >
                <FcGoogle size={22} />
                Continue with Google
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signUp"
                  className="font-medium text-amber-600 hover:text-amber-700"
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

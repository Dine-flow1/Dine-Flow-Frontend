"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AuthWrapper from "@/components/Auth/authWrapper";
import InputField from "@/components/Auth/InputField";
import SubmitButton from "@/components/Auth/submitButton";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", form);
      const { role, token } = res.data;
      localStorage.setItem("token", token);

      if (role === "owner") router.push("/owner/dashboard");
      else if (role === "manager") router.push("/manager/dashboard");
      else if (role === "staff") router.push("/staff/dashboard");
      else router.push("/customer/home");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <form onSubmit={handleSubmit}>
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Welcome Back 👋</h2>
        <InputField name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <InputField name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <SubmitButton label="Login" loading={loading} />
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <span className="text-blue-600 cursor-pointer" onClick={() => router.push("/auth/register")}>
            Register
          </span>
        </p>
      </form>
    </AuthWrapper>
  );
}

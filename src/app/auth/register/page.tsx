"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AuthWrapper from "@/components/Auth/authWrapper";
import InputField from "@/components/Auth/InputField";
import SelectField from "@/components/Auth/SelectionField";
import SubmitButton from "@/components/Auth/submitButton";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "manager" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/auth/register", form);
      alert("Registration successful! Please log in.");
      router.push("/auth/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <form onSubmit={handleSubmit}>
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Create Account 🌟</h2>
        <InputField name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
        <InputField name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <InputField name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <SelectField
          name="role"
          value={form.role}
          onChange={handleChange}
          options={[
            { label: "SaaS Owner", value: "owner" },
            { label: "Hotel Manager", value: "manager" },
          ]}
        />
        <SubmitButton label="Register" loading={loading} color="green" />
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <span className="text-green-600 cursor-pointer" onClick={() => router.push("/auth/login")}>
            Login
          </span>
        </p>
      </form>
    </AuthWrapper>
  );
}

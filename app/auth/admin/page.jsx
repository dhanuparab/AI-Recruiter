"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = () => {
    // TODO: Replace with your actual admin login logic
    if (email && password) {
      router.push("/dashboard/admin-panel");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-yellow-50">
      <button className="mb-6 text-red-700 hover:underline flex items-center gap-1" onClick={() => router.push("/")}>
        <span>&larr;</span> Back to Home
      </button>
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <ShieldCheck className="w-12 h-12 text-red-500 mb-2" />
          <h2 className="text-2xl font-bold text-center text-red-700">Admin Access Only</h2>
          <p className="text-sm text-gray-500 mt-2 text-center">Authorized personnel only. Pre-approved accounts required.</p>
        </div>
        <label className="block text-sm font-medium mb-1">Admin Email</label>
        <input
          type="email"
          className="w-full mb-4 px-3 py-2 rounded bg-red-50 border focus:outline-none"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="admin@company.com"
        />
        <label className="block text-sm font-medium mb-1">Admin Password</label>
        <input
          type="password"
          className="w-full mb-6 px-3 py-2 rounded bg-red-50 border focus:outline-none"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="********"
        />
        <button
          className="w-full py-2 rounded bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold text-lg flex items-center justify-center gap-2"
          onClick={handleAdminLogin}
        >
          Admin Login
        </button>
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-gray-700">
          <div className="font-semibold mb-1">Demo Credentials:</div>
          <div>Email: admin@company.com</div>
          <div>Password: Any password</div>
        </div>
      </div>
    </div>
  );
}
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Users } from "lucide-react";

export default function RecruiterLogin() {
  const router = useRouter();
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: Replace with your actual recruiter login logic
    if (email && password) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <button className="mb-6 text-blue-700 hover:underline flex items-center gap-1" onClick={() => router.push("/")}>
        <span>&larr;</span> Back to Home
      </button>
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Recruiter Access</h2>
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 rounded-l-lg border ${tab === "login" ? "bg-blue-100 text-blue-700 font-semibold" : "bg-gray-50 text-gray-500"}`}
            onClick={() => setTab("login")}
          >
            <User className="inline w-4 h-4 mr-1" /> Login
          </button>
          <button
            className={`flex-1 py-2 rounded-r-lg border ${tab === "signup" ? "bg-blue-100 text-blue-700 font-semibold" : "bg-gray-50 text-gray-500"}`}
            onClick={() => setTab("signup")}
          >
            <Users className="inline w-4 h-4 mr-1" /> Sign Up
          </button>
        </div>
        {tab === "login" ? (
          <>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full mb-4 px-3 py-2 rounded bg-blue-50 border focus:outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@company.com"
            />
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full mb-6 px-3 py-2 rounded bg-blue-50 border focus:outline-none"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="********"
            />
            <button
              className="w-full py-2 rounded bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-lg"
              onClick={handleLogin}
            >
              Login
            </button>
          </>
        ) : (
          <>
            {/* Sign Up Form */}
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full mb-4 px-3 py-2 rounded bg-blue-50 border focus:outline-none"
              placeholder="your@email.com"
            />
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full mb-6 px-3 py-2 rounded bg-blue-50 border focus:outline-none"
              placeholder="********"
            />
            <button
              className="w-full py-2 rounded bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-lg"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}
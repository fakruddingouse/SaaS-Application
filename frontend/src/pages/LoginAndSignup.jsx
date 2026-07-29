import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth.js";

function LoginAndSignup({ user, setUser }) {

  const [ state, setState ] = useState("Login");
  const [ username, setUsername ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ loading, setLoading ] = useState(false);

  const { signup, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let credentials;
      if (state === 'Sign Up') {
        credentials = { username, phone, email, password };
        await signup(credentials);
      } else {
        credentials = { email, password };
        await login(credentials);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          {state === "Sign Up" ? "Create Account" : "Welcome Back"}
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          {state === "Sign Up"
            ? "Sign up to continue"
            : "Login to your account"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {state === "Sign Up" &&  (
            <>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-lg font-semibold shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Please wait..." : state === "Sign Up" ? "Create Account" : "Login"}
          </button>

        </form>

        <div className="mt-6 text-center text-gray-600">
          {state === "Login" ? (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setState("Sign Up")}
                className="text-blue-600 hover:underline font-semibold"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setState("Login")}
                className="text-blue-600 hover:underline font-semibold"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginAndSignup;
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import capitalizeFirstLetter from "../utils/utils";
import { useAuth } from "../hooks/useAuth";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        <div
          onClick={() => navigate("/")}
          className="cursor-pointer"
        >
          <h1 className="text-3xl font-bold text-blue-600">
            AI Studio
          </h1>

          <p className="text-xs text-gray-500">
            Create with AI
          </p>
        </div>

        <div className="flex items-center gap-5">

          {user && (
            <div className="hidden md:flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold">

                {user.username.charAt(0).toUpperCase()}

              </div>

              <div>

                <p className="text-xs text-gray-500">
                  Welcome back
                </p>

                <h2 className="font-semibold text-gray-800">
                  {capitalizeFirstLetter(user.username)}
                </h2>

              </div>

            </div>
          )}

          {!user ? (
            <Button
              name="Login / Signup"
              onClick={() => navigate("/login")}
            />
          ) : (
            <Button
              name="Logout"
              variant="danger"
              onClick={handleLogout}
            />
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;
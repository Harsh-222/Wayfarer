import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-paper/10 sticky top-0 bg-navy/95 backdrop-blur z-10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl text-amber tracking-tight">WAYFARER</span>
          <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-[0.2em] text-paper/40">
            trip planner
          </span>
        </Link>

        <nav className="flex items-center gap-5 font-mono text-sm">
          {user ? (
            <>
              <Link to="/plan" className="text-paper/80 hover:text-amber transition-colors">
                New trip
              </Link>
              <Link to="/dashboard" className="text-paper/80 hover:text-amber transition-colors">
                My itineraries
              </Link>
              <span className="text-paper/40 hidden sm:inline">{user.name}</span>
              <button
                onClick={handleLogout}
                className="border border-paper/20 rounded-full px-3 py-1 hover:border-amber hover:text-amber transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-paper/80 hover:text-amber transition-colors">
                Log in
              </Link>
              <Link
                to="/register"
                className="border border-amber text-amber rounded-full px-3 py-1 hover:bg-amber hover:text-navy transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

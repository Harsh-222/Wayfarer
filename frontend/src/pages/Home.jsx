import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber mb-4">
        Phase 1 — BCA / BTech Interdisciplinary Project
      </p>
      <h1 className="font-display text-4xl sm:text-5xl leading-tight max-w-2xl">
        Plan the trip.
        <br />
        <span className="text-amber">Skip the spreadsheet.</span>
      </h1>
      <p className="font-body text-paper/70 mt-5 max-w-xl">
        Tell Wayfarer your budget, your days off, and what you're actually into —
        it hands back a day-by-day plan, no fifteen open tabs required.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          to={user ? "/plan" : "/register"}
          className="bg-amber text-navy font-mono font-bold uppercase text-sm tracking-wide px-6 py-3 rounded-full hover:brightness-110 transition"
        >
          {user ? "Plan a new trip" : "Get started free"}
        </Link>
        {!user && (
          <Link
            to="/login"
            className="border border-paper/20 font-mono uppercase text-sm tracking-wide px-6 py-3 rounded-full hover:border-amber hover:text-amber transition"
          >
            I have an account
          </Link>
        )}
      </div>

      {/* Signature element: a boarding-pass style ticket stub previewing the product */}
      <div className="mt-16 max-w-xl bg-paper text-navy rounded-2xl shadow-2xl flex overflow-hidden">
        <div className="flex-1 p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy/50">
            Your next trip
          </p>
          <p className="font-display text-2xl mt-1">Wherever you decide</p>
          <div className="grid grid-cols-3 gap-4 mt-5 font-mono text-xs">
            <div>
              <p className="text-navy/50 uppercase tracking-wide">Budget</p>
              <p className="font-bold mt-1">Your call</p>
            </div>
            <div>
              <p className="text-navy/50 uppercase tracking-wide">Duration</p>
              <p className="font-bold mt-1">1–30 days</p>
            </div>
            <div>
              <p className="text-navy/50 uppercase tracking-wide">Interests</p>
              <p className="font-bold mt-1">Picked by you</p>
            </div>
          </div>
        </div>
        <div className="relative w-28 bg-navy text-amber flex flex-col items-center justify-center perforated">
          <span className="punch" style={{ top: "-10px" }}></span>
          <span className="punch" style={{ bottom: "-10px" }}></span>
          <span className="font-display text-3xl rotate-90">GO</span>
        </div>
      </div>

      <section className="mt-20 grid sm:grid-cols-3 gap-6">
        {[
          { label: "01 — Tell us", text: "Destination type, budget band, trip length and interests." },
          { label: "02 — We match", text: "A rule-based engine scores destinations against your inputs." },
          { label: "03 — You get", text: "A day-by-day plan with activities and an estimated cost." },
        ].map((step) => (
          <div key={step.label} className="border-t border-paper/15 pt-4">
            <p className="font-mono text-xs text-amber tracking-wide">{step.label}</p>
            <p className="text-paper/70 text-sm mt-2">{step.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;

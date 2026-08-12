import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const DESTINATION_TYPES = ["beach", "mountains", "city", "heritage", "wildlife", "adventure"];
const BUDGETS = ["low", "medium", "high"];
const GROUP_TYPES = ["solo", "couple", "family", "friends"];
const INTEREST_OPTIONS = ["food", "nightlife", "trekking", "museums", "shopping", "relaxation", "history", "nature"];

const PreferenceForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    destinationType: "beach",
    budget: "medium",
    durationDays: 3,
    interests: [],
    travelMonth: "",
    groupType: "solo",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleInterest = (interest) => {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter((i) => i !== interest)
        : [...f.interests, interest],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/itineraries", form);
      navigate(`/itinerary/${res.data.itinerary._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't generate an itinerary. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber mb-3">Trip details</p>
      <h1 className="font-display text-3xl mb-2">Fill in your ticket</h1>
      <p className="text-paper/60 text-sm mb-8">
        Every field below feeds the matching engine directly — the more specific, the better the plan.
      </p>

      {error && (
        <div className="bg-stamp/10 border border-stamp text-stamp text-sm rounded-lg px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-paper text-navy rounded-2xl p-6 sm:p-8">
        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-navy/50">Destination type</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
            {DESTINATION_TYPES.map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setForm({ ...form, destinationType: type })}
                className={`capitalize text-sm rounded-lg px-3 py-2 border transition ${
                  form.destinationType === type
                    ? "bg-navy text-amber border-navy"
                    : "border-navy/20 hover:border-navy/50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-navy/50">Budget</label>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {BUDGETS.map((b) => (
              <button
                type="button"
                key={b}
                onClick={() => setForm({ ...form, budget: b })}
                className={`capitalize text-sm rounded-lg px-3 py-2 border transition ${
                  form.budget === b ? "bg-navy text-amber border-navy" : "border-navy/20 hover:border-navy/50"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="font-mono text-xs uppercase tracking-wide text-navy/50">
              Duration (days)
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={form.durationDays}
              onChange={(e) => setForm({ ...form, durationDays: Number(e.target.value) })}
              className="mt-2 w-full border border-navy/20 rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber"
            />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-wide text-navy/50">
              Travel month (optional)
            </label>
            <input
              type="text"
              value={form.travelMonth}
              onChange={(e) => setForm({ ...form, travelMonth: e.target.value })}
              placeholder="e.g. December"
              className="mt-2 w-full border border-navy/20 rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber"
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-navy/50">Group type</label>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {GROUP_TYPES.map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => setForm({ ...form, groupType: g })}
                className={`capitalize text-xs rounded-lg px-2 py-2 border transition ${
                  form.groupType === g ? "bg-navy text-amber border-navy" : "border-navy/20 hover:border-navy/50"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-navy/50">Interests</label>
          <div className="flex flex-wrap gap-2 mt-3">
            {INTEREST_OPTIONS.map((interest) => (
              <button
                type="button"
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`capitalize text-xs rounded-full px-3 py-1.5 border transition ${
                  form.interests.includes(interest)
                    ? "bg-amber text-navy border-amber"
                    : "border-navy/20 hover:border-navy/50"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy text-amber font-mono font-bold uppercase text-sm tracking-wide py-3 rounded-full hover:brightness-125 transition disabled:opacity-60"
        >
          {loading ? "Matching your trip…" : "Generate itinerary"}
        </button>
      </form>
    </div>
  );
};

export default PreferenceForm;

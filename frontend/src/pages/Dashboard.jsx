import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

const Dashboard = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/itineraries")
      .then((res) => setItineraries(res.data.itineraries))
      .catch((err) => setError(err.response?.data?.message || "Couldn't load your itineraries."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber mb-3">Trip history</p>
      <h1 className="font-display text-3xl mb-8">My itineraries</h1>

      {loading && <p className="text-paper/60">Loading…</p>}
      {error && <p className="text-stamp">{error}</p>}

      {!loading && itineraries.length === 0 && (
        <div className="border border-paper/15 rounded-2xl p-8 text-center">
          <p className="text-paper/70 mb-4">No itineraries yet — your next trip starts with a form.</p>
          <Link
            to="/plan"
            className="inline-block bg-amber text-navy font-mono font-bold uppercase text-sm tracking-wide px-6 py-3 rounded-full hover:brightness-110 transition"
          >
            Plan a trip
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {itineraries.map((it) => (
          <Link
            to={`/itinerary/${it._id}`}
            key={it._id}
            className="flex items-center justify-between bg-paper text-navy rounded-xl px-6 py-4 hover:brightness-95 transition"
          >
            <div>
              <p className="font-display text-lg">{it.destinationName}</p>
              <p className="font-mono text-xs text-navy/50">
                {it.days.length} days · {it.preference?.budget} budget · {it.preference?.groupType}
              </p>
            </div>
            <p className="font-mono text-sm text-navy/60">
              ₹{it.totalEstimatedCost.toLocaleString("en-IN")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

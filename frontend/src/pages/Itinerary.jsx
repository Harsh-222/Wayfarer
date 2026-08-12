import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios.js";

const Itinerary = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/itineraries/${id}`)
      .then((res) => setItinerary(res.data.itinerary))
      .catch((err) => setError(err.response?.data?.message || "Couldn't load this itinerary."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="max-w-3xl mx-auto px-6 py-16 text-paper/60">Loading your itinerary…</p>;
  if (error) return <p className="max-w-3xl mx-auto px-6 py-16 text-stamp">{error}</p>;
  if (!itinerary) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber mb-3">Your itinerary</p>
      <h1 className="font-display text-4xl mb-1">{itinerary.destinationName}</h1>
      <p className="text-paper/60 text-sm mb-8">
        {itinerary.days.length} day{itinerary.days.length > 1 ? "s" : ""} · estimated cost ₹
        {itinerary.totalEstimatedCost.toLocaleString("en-IN")}
      </p>

      <div className="space-y-4">
        {itinerary.days.map((day) => (
          <div key={day.day} className="bg-paper text-navy rounded-2xl p-6 perforated">
            <p className="font-mono text-xs uppercase tracking-wide text-navy/50 mb-3">Day {day.day}</p>
            <div className="space-y-3">
              {day.activities.map((activity, idx) => (
                <div key={idx} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wide text-navy/40">
                      {activity.time}
                    </p>
                    <p className="font-display text-base leading-snug">{activity.title}</p>
                  </div>
                  <p className="font-mono text-sm text-navy/60 whitespace-nowrap">
                    ₹{activity.estimatedCost.toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-4">
        <Link
          to="/plan"
          className="bg-amber text-navy font-mono font-bold uppercase text-sm tracking-wide px-6 py-3 rounded-full hover:brightness-110 transition"
        >
          Plan another trip
        </Link>
        <Link
          to="/dashboard"
          className="border border-paper/20 font-mono uppercase text-sm tracking-wide px-6 py-3 rounded-full hover:border-amber hover:text-amber transition"
        >
          View all itineraries
        </Link>
      </div>
    </div>
  );
};

export default Itinerary;

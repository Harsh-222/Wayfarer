import React from "react";
import { Link } from "react-router-dom";
import { FALLBACK, getDestinationImage } from "../utils/destinationImages.js";

export default function DestinationCard({d,favorite=false,onFavorite}){
  const image=getDestinationImage(d);
  return <article className="card overflow-hidden group">
    <Link to={`/destinations/${d._id}`} className="block">
      <div className="image-wrap relative h-52">
        <img src={image} onError={e=>{e.currentTarget.src=FALLBACK}} alt={d.name} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>
        <div className="absolute left-4 bottom-4"><span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur text-xs capitalize">{d.type}</span></div>
        <div className="absolute right-4 top-4 flex gap-2"><span className="px-2.5 py-1 rounded-full bg-white/90 text-navy text-xs font-bold">★ {d.rating?.toFixed?.(1)||"4.7"}</span></div>
      </div>
    </Link>
    <div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-white/50 text-xs">{d.country} · {d.budgetLevel} budget</p><Link to={`/destinations/${d._id}`} className="font-display text-2xl mt-1 block group-hover:text-amber transition">{d.name}</Link></div>{onFavorite&&<button aria-label="Save destination" onClick={()=>onFavorite(d._id)} className={`w-9 h-9 rounded-full border grid place-items-center ${favorite?"bg-amber text-navy border-amber":"border-white/15"}`}>{favorite?"♥":"♡"}</button>}</div><p className="text-white/60 text-sm mt-3 line-clamp-2">{d.description}</p><div className="flex flex-wrap gap-1.5 mt-4">{(d.tags||[]).slice(0,4).map(t=><span key={t} className="text-[11px] px-2 py-1 rounded-full border border-white/10 text-white/55">#{t}</span>)}</div><div className="flex items-center justify-between mt-5 pt-4 border-t border-white/8"><span className="text-sm text-white/60">From <b className="text-white">₹{(d.estimatedDailyBudget||1500).toLocaleString()}</b>/day</span><span className="text-amber text-sm font-semibold">Explore →</span></div></div>
  </article>
}

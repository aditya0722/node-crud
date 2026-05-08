import { useState } from "react";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80";

function formatDuration(minutes) {
  if (!minutes) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

const STATUS_BADGE = {
  upcoming:    { label: "UPCOMING", color: "bg-sky-500"     },
  now_showing: { label: "NOW LIVE", color: "bg-emerald-500" },
  ended:       { label: "ENDED",    color: "bg-gray-500"    },
};

export default function ShowCard({ show }) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const badge = STATUS_BADGE[show.status] || { label: show.status?.toUpperCase(), color: "bg-gray-600" };

  const posterSrc =
    !show.poster_url || show.poster_url.includes("example.com") || imgError
      ? FALLBACK_IMAGE
      : show.poster_url;

  return (
    <div className="group relative bg-[#15151e] rounded-2xl overflow-hidden border border-white/5 hover:border-rose-500/30 transition-all duration-300 hover:-translate-y-1">

      {/* Poster */}
      <div className="relative overflow-hidden h-56">
        <img
          src={posterSrc}
          alt={show.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15151e] via-transparent to-transparent" />

        {/* Status badge */}
        <span className={`absolute top-3 left-3 ${badge.color} text-white text-[10px] font-black px-2 py-1 rounded-lg tracking-widest`}>
          {badge.label}
        </span>

        {/* Wishlist */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-7 h-7 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-rose-500/80 transition-all"
        >
          <svg
            className={`w-3.5 h-3.5 ${liked ? "fill-rose-400 text-rose-400" : "fill-none text-white"}`}
            stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-white text-xs font-bold">{show.rating}</span>
          <span className="text-gray-400 text-xs">/5</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-bold text-base leading-tight mb-1 line-clamp-1">{show.title}</h3>

        {show.description && (
          <p className="text-gray-500 text-xs mb-2 line-clamp-2 leading-relaxed">{show.description}</p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          {show.genre?.slice(0, 2).map((g) => (
            <span key={g} className="text-[11px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-md font-medium">{g}</span>
          ))}
          {show.language && (
            <>
              <span className="text-[11px] text-gray-600">•</span>
              <span className="text-[11px] text-gray-500">{show.language}</span>
            </>
          )}
          {show.duration_minutes && (
            <>
              <span className="text-[11px] text-gray-600">•</span>
              <span className="text-[11px] text-gray-500">{formatDuration(show.duration_minutes)}</span>
            </>
          )}
        </div>

        {show.release_date && (
          <p className="text-xs text-gray-600 mb-3">
            <span className="text-gray-500">Release:</span> {formatDate(show.release_date)}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-white/5">
          {show.trailer_url && (
            <a
              href={show.trailer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-rose-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Trailer
            </a>
          )}
          <button className="ml-auto bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
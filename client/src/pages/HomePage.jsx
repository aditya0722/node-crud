import { useEffect, useState } from "react";
import ShowCard from "../components/ShowCard";
import { useCityContext } from "../context/CityContext";
const FILTERS = ["All", "Movies", "Events", "Plays", "Sports", "Concerts", "Others"];
const LANGUAGES = ["All", "Hindi", "English", "Tamil", "Telugu", "Bengali"];
const GENRES = ["All", "Action", "Drama", "Comedy", "Thriller", "Horror", "Sci-Fi", "Adventure"];

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [language, setLanguage] = useState("All");
  const [genre, setGenre] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  const { selectedCity } = useCityContext();

  const getShows = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page);
      params.set("limit", limit);
      if (activeFilter !== "All") params.set("category", activeFilter);
      if (language !== "All") params.set("language", language);
      if (genre !== "All") params.set("genre", genre);
      if (searchQuery) params.set("search", searchQuery);
      if (sortBy) params.set("sort", sortBy);
      if (selectedCity) params.set("city", selectedCity);

      console.log(params.toString());
      
      const response = await fetch(`/api/shows?${params.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (!result.success) {
        alert("Failed to fetch shows");
        return;
      }

      setShows(result.data.shows);
      setTotal(result.data.pagination.total);
      setTotalPages(result.data.pagination.totalPages);
    } catch (err) {
      console.error("Error fetching shows:", err);
      alert("An error occurred while fetching shows");
    } finally {
      setLoading(false);
    }
  };

  // reset to page 1 when any filter changes
  useEffect(() => { setPage(1); }, [activeFilter, language, genre, sortBy, searchQuery, selectedCity]);

  useEffect(() => { getShows(); }, [page, activeFilter, language, genre, sortBy, searchQuery, selectedCity]);

  return (
    <div className="bg-[#0f0f13] text-white w-full min-h-screen">

      {/* Hero */}
      <div className="pt-24 pb-12 px-4 sm:px-6 overflow-hidden w-full relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <p className="text-rose-400 text-sm font-bold tracking-widest uppercase mb-2">Now Showing</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-1">Book Your Next</h1>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
              Experience
            </span>
          </h1>
          <p className="text-gray-400 text-base max-w-md">Movies, concerts, sports & more — all in one place.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-[60px] z-40 bg-[#0f0f13]/95 backdrop-blur-lg border-b border-white/5 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">

          {/* Category tabs */}
          <div className="flex  gap-1.5 overflow-x-auto no-scrollbar">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 text-sm font-semibold px-4 py-1.5 rounded-xl transition-all ${
                  activeFilter === f
                    ? "bg-rose-500 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Dropdowns + search */}
          <div className="flex justify-end items-center gap-3 flex-wrap">
           

            {/* Language */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:border-rose-500/50 cursor-pointer w-32"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l} className="bg-[#1a1a24]">{l}</option>
                ))}
              </select>
            </div>

            {/* Genre */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:border-rose-500/50 cursor-pointer w-32"
              >
                {GENRES.map((g) => (
                  <option key={g} value={g} className="bg-[#1a1a24]">{g}</option>
                ))}
              </select>
            </div>

            
          </div>
        </div>
      </div>

      {/* Shows Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-sm text-gray-500 mb-6 font-medium">
          Showing <span className="text-white font-bold">{total}</span> results
          {activeFilter !== "All" && (
            <> in <span className="text-rose-400">{activeFilter}</span></>
          )}
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <svg className="w-8 h-8 animate-spin text-rose-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        ) : shows.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {shows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                      p === page
                        ? "bg-rose-500 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg font-semibold">No shows found</p>
            <p className="text-gray-600 text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}
      </main>
    </div>
  );
}
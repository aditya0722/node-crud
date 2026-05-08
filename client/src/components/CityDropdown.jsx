export default function CityDropdown({
  cityOpen,
  cities,
  selectedCity,
  handleSelectCity,
}) {
  if (!cityOpen) return null;

  return (
    <div className="absolute top-full right-0 z-50 mt-2 w-56 rounded-2xl border border-white/10 bg-[#1a1a24] p-2 shadow-2xl">
      
      {/* Heading */}
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
        Select City
      </p>

      {/* Cities */}
      <div className="grid grid-cols-2 gap-1">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => handleSelectCity(city)}
            className={`rounded-lg px-3 py-2 text-left text-sm transition-all ${
              selectedCity === city
                ? "bg-rose-500/20 font-semibold text-rose-400"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
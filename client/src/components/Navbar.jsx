import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useCityContext } from "../context/CityContext";

import ProfileDropdown from "./ProfileDorpdown";
import CityDropdown from "./CityDropdown";

const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
];

const navLinks = ["Movies", "Events", "Plays", "Sports", "Activities"];

export default function Navbar() {
  const { user } = useAuth();

  const { selectedCity, setSelectedCity } = useCityContext();
  const [cityOpen, setCityOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const mobileMenuRef = useRef();
  const mobileButtonRef = useRef();
     const cityRef = useRef();

  // City is managed by CityContext

  // outside click close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(e.target) &&
        cityRef.current &&
        !cityRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
        setCityOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setCityOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0f0f13]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500">
            <svg
              className="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z" />
            </svg>
          </div>

          <span className="text-xl font-black tracking-tight text-white">
            SHOW<span className="text-rose-500">SPOT</span>
          </span>
        </a>

        {/* Desktop Search */}
        <div className="hidden max-w-md flex-1 md:block">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search movies, events..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-rose-500/60"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          
          {/* Desktop City */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setCityOpen(!cityOpen)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 transition-all hover:bg-white/5 hover:text-white"
            >
              <svg
                className="h-4 w-4 text-rose-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              </svg>

              <span>{selectedCity}</span>

              <svg
                className={`h-4 w-4 transition-transform ${
                  cityOpen ? "rotate-180" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>

            <CityDropdown
              ref={cityRef}
              cityOpen={cityOpen}
              cities={cities}
              selectedCity={selectedCity}
              handleSelectCity={handleSelectCity}
            />
          </div>

          {/* Profile */}
          {user ? (
            <>
              {showProfile && (
                <ProfileDropdown
                  user={user}
                  setOpen={setShowProfile}
                />
              )}

              <button
                onClick={() =>
                  setShowProfile((prev) => !prev)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-600 text-sm font-semibold uppercase text-white"
              >
                {user.name.charAt(0)}
              </button>
            </>
          ) : (
            <button className="hidden rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-rose-600 md:block">
              Sign In
            </button>
          )}

          {/* Mobile Toggle */}
          <button
            ref={mobileButtonRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-gray-400 transition-all hover:bg-white/5 hover:text-white md:hidden"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="border-t border-white/5 bg-[#0b0b10]/95 backdrop-blur-xl md:hidden"
        >
          <div className="space-y-5 px-4 py-5">

            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>

              <input
                type="text"
                placeholder="Search movies, events..."
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 outline-none focus:border-rose-500/50"
              />
            </div>

            {/* Mobile City */}
            <div className="relative">
              <button
                onClick={() => setCityOpen(!cityOpen)}
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
              >
                <div>
                  <p className="text-xs text-gray-500">
                    Current City
                  </p>

                  <p className="text-sm font-medium text-white">
                    {selectedCity}
                  </p>
                </div>

                <svg
                  className={`h-4 w-4 text-gray-400 transition-transform ${
                    cityOpen ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </button>

              <CityDropdown
                cityOpen={cityOpen}
                cities={cities}
                selectedCity={selectedCity}
                handleSelectCity={handleSelectCity}
                ref={cityRef}
              />
            </div>

          

            {/* Mobile Auth */}
            {!user && (
              <button className="w-full rounded-2xl bg-rose-500 py-3 text-sm font-semibold text-white transition-all hover:bg-rose-600">
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
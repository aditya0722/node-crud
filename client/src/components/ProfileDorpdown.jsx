import { useEffect, useRef } from "react";
import {
  FaUser,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaBook,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
export default function ProfileDropdown({ user, setOpen }) {
  const dropdownRef = useRef();

  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [setOpen]);

  return (
    <div className="flex items-center justify-center bg-[#0d1117]">
      <div
        ref={dropdownRef}
        className="absolute top-11 right-10 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#161b22] text-white shadow-2xl"
      >
        {/* Profile Section */}
        <div className="flex items-center gap-3 border-b border-white/10 p-4">
          {user.profile?.avatar ? (
            <img
              src={user.profile.avatar}
              alt="profile"
              className="h-12 w-12 rounded-full"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 text-xs uppercase text-white">
              {user.name.charAt(0)}
            </div>
          )}

          <div>
            <h2 className="text-sm font-semibold">{user.name}</h2>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="p-2">
          <MenuItem icon={<FaUser />} text="Profile" />
          <MenuItem icon={<FaBook />} text="Bookings" />
          <MenuItem icon={<FaStar />} text="Wishlist" />
          <MenuItem icon={<FaCog />} text="Settings" />

          <div className="my-2 border-t border-white/10" />

          <MenuItem
            icon={<FaSignOutAlt />}
            text="Sign out"
            onClick={logout}
            danger
          />
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon, text, danger,onClick }) {
  return (
    <button
    onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition duration-200 ${
        danger
          ? "text-red-400 hover:bg-red-500/10"
          : "text-gray-200 hover:bg-white/10"
      }`}
    >
      <span className="text-base">{icon}</span>
      <span>{text}</span>
    </button>
  );
}
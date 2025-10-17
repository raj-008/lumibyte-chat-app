import { useEffect, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { CiSun } from "react-icons/ci";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches));

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [isDark]);

  return (
    <button onClick={() => setIsDark(!isDark)} className="absolute top-5 right-2 sm:right-5 p-2 rounded-full bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 transition">
      {isDark ? <CiSun className="text-yellow-400" size={20} /> : <FaRegMoon className="text-gray-800" size={20} />}
    </button>
  );
};

export default DarkModeToggle;

import { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const ChatLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`flex-1 transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}>
        <Header />
        <main className="p-2 dark:bg-neutral-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ChatLayout;

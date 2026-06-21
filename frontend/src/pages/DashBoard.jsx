import React from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import { useState, useEffect } from "react";
import { SelectionProvider } from "../../src/components/context/SelectionContext";

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Khởi tạo state từ localStorage hoặc cấu hình hệ thống
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  // Đồng bộ class "dark" vào thẻ html và lưu vào localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <SelectionProvider>
      <div className="font-jakarta relative mx-auto flex h-dvh w-full overflow-hidden bg-gray-50 text-gray-900 transition-colors duration-500 2xl:max-w-480 2xl:border-x 2xl:border-slate-200 dark:bg-[#0f172a] dark:text-slate-200 dark:2xl:border-slate-800">
        <SideBar
          isSidebarOpen={isSidebarOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
          <MainContent isDarkMode={isDarkMode} />
        </div>
      </div>
    </SelectionProvider>
  );
};

export default DashBoard;

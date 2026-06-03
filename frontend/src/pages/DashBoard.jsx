import React from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import { useState, useEffect } from "react";
import { SelectionProvider } from "../../src/components/context/SelectionContext";

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <SelectionProvider>
      <div className="font-jakarta relative mx-auto flex h-dvh w-full overflow-hidden bg-gray-50 text-gray-900 transition-colors duration-500 dark:bg-[#0f172a] dark:text-slate-200 2xl:max-w-480 2xl:border-x 2xl:border-slate-200 dark:2xl:border-slate-800">
        <SideBar
          isSidebarOpen={isSidebarOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          <MainContent />
        </div>
      </div>
    </SelectionProvider>
  );
};

export default DashBoard;

import React, { useEffect, useState, useRef } from "react";
import { WMSTileLayer } from "react-leaflet";
import L from "leaflet";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Clock,
  ChevronDown,
} from "lucide-react";
import { useSelection } from "../context/SelectionContext";

const AnimationProduct = () => {
  const [timeline, setTimeline] = useState({ list: [], index: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const animationRef = useRef(null);
  const dropdownRef = useRef(null);
  const { selections } = useSelection();

  let product = selections.products.name;
  
  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:5001/api/time?product=${product}`,
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Trường hợp 1: Nhận dữ liệu khởi tạo (danh sách 6 mốc)
        if (data.timestamps) {
          console.log(`Dữ liệu khởi tạo cho [${product}]:`, data.timestamps);
          setTimeline({
            list: data.timestamps,
            index: data.timestamps.length - 1,
          });
        }
        // Trường hợp 2: Nhận cập nhật mốc thời gian mới duy nhất
        else if (data.newTimestamp) {
          console.log(`Cập nhật mốc mới cho [${product}]:`, data.newTimestamp);
          setTimeline((prev) => {
            if (prev.list.includes(data.newTimestamp)) return prev;

            const newList = [...prev.list, data.newTimestamp].slice(-6);
            let newIndex = prev.index;

            if (prev.index === prev.list.length - 1) {
              newIndex = newList.length - 1;
            } else {
              newIndex = Math.max(0, prev.index - 1);
            }

            return { list: newList, index: newIndex };
          });
        }
      } catch (err) {
        console.error("Lỗi parse dữ liệu SSE:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("Lỗi kết nối SSE:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      console.log(`Đã ngắt kết nối SSE cho sản phẩm: ${product}`);
    };
  }, [product]);

  // Logic chạy Animation
  useEffect(() => {
    if (isPlaying && timeline.list.length > 0) {
      animationRef.current = setInterval(() => {
        setTimeline((prev) => ({
          ...prev,
          index: prev.index >= prev.list.length - 1 ? 0 : prev.index + 1,
        }));
      }, 800); 
    } else {
      clearInterval(animationRef.current);
    }
    return () => clearInterval(animationRef.current);
  }, [isPlaying, timeline.list]);

  // Xử lý click ra ngoài để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNext = () => {
    setIsPlaying(false);
    setTimeline((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.list.length,
    }));
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setTimeline((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.list.length) % prev.list.length,
    }));
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (timeline.list.length === 0) return null;

  return (
    <>
      <WMSTileLayer
        key={`${product}-${timeline.list[timeline.index]}`}
        url="https://radarphadin.com.vn/geoserver/radar/gwc/service/wms"
        params={{
          layers: `radar:${product.toLowerCase()}_mosaic_index`,
          format: "image/png",
          transparent: true,
          version: "1.1.1",
          time: timeline.list[timeline.index],
          pane: "paneRadar",
          crs: L.CRS.EPSG3857,
        }}
      />
      {console.log("render animation")}
      {/* Giao diện điều khiển Animation */}
      <div className="absolute top-2 right-15 z-1000 w-[90%] max-w-70 md:w-80">
        <div className="p-4 border shadow-2xl rounded-3xl border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/90">
          {/* Dropdown chọn thời gian */}
          <div className="relative mb-4" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 p-2.5 transition-all hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700/80"
            >
              <div className="text-indigo-600 shrink-0 dark:text-indigo-400">
                <Clock size={18} />
              </div>
              <span className="flex-1 text-left text-[13px] font-bold text-slate-700 dark:text-slate-200">
                {formatTime(timeline.list[timeline.index])}
              </span>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Menu sổ xuống (Custom List) */}
            {isDropdownOpen && (
              <div className="animate-in fade-in slide-in-from-top-2 absolute top-full left-0 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-indigo-500/10 duration-200 dark:border-slate-700 dark:bg-slate-900">
                {timeline.list.map((time, idx) => (
                  <button
                    key={time}
                    onClick={() => {
                      setTimeline((prev) => ({ ...prev, index: idx }));
                      setIsPlaying(false);
                      setIsDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                      timeline.index === idx
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span
                      className={
                        timeline.index === idx
                          ? "font-bold text-indigo-600 dark:text-indigo-400"
                          : "font-medium"
                      }
                    >
                      {formatTime(time)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Nút điều khiển */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handlePrev}
              className="flex flex-1 items-center justify-center rounded-2xl bg-slate-100 p-2.5 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              title="Về trước"
            >
              <SkipBack size={18} fill="currentColor" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex flex-2 items-center justify-center gap-2 rounded-2xl p-2.5 font-bold shadow-lg transition-all ${
                isPlaying
                  ? "bg-rose-500 text-white shadow-rose-500/20 hover:bg-rose-600 active:scale-95"
                  : "bg-indigo-600 text-white shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95"
              }`}
            >
              {isPlaying ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
              <span className="text-sm">{isPlaying ? "Dừng" : "Phát"}</span>
            </button>

            <button
              onClick={handleNext}
              className="flex flex-1 items-center justify-center rounded-2xl bg-slate-100 p-2.5 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              title="Tiếp theo"
            >
              <SkipForward size={18} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AnimationProduct;

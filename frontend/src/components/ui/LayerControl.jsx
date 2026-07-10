import React, { useEffect, useRef, useState } from "react";
import { Layers, ChevronDown, SatelliteDish, Map } from "lucide-react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { locationPHA } from "../../lib/constants";
import { useSelection } from "../../context/SelectionContext";
/**
 * Cấu hình các lớp bản đồ có thể bật/tắt
 */
const layerConfigs = [
  {
    id: "radarStations",
    label: "Trạm Ra đa",
    description: "Vị trí các trạm ra đa thời tiết",
    icon: SatelliteDish,
    iconColor: "text-amber-500",
    defaultVisible: true,
  },
  {
    id: "mergeDistricts",
    label: "Điểm dự báo",
    description: "Lớp điểm dự báo (gộp xã/phường)",
    icon: Map,
    iconColor: "text-emerald-500",
    defaultVisible: false,
  },
];

const LayerControl = () => {
  const { layerVisibility, setLayerVisibility } = useSelection();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const panelRef = useRef(null);
  const map = useMap();

  // Ngăn lan truyền sự kiện click/scroll xuống bản đồ Leaflet
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      L.DomEvent.disableClickPropagation(el);
      L.DomEvent.disableScrollPropagation(el);
    }
  }, []);

  // Click ra ngoài để đóng panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLayer = (layerId) => {
    setLayerVisibility((prev) => ({
      ...prev,
      [layerId]: !prev[layerId],
    }));
  };

  const activeCount = Object.values(layerVisibility).filter(Boolean).length;

  return (
    <div
      ref={containerRef}
      className="absolute z-1000 hidden md:top-4 lg:left-4 lg:block"
    >
      <div ref={panelRef}>
        {/* Nút toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative flex items-center gap-2 rounded-xl border p-2.5 shadow-2xl backdrop-blur-md transition-all duration-300 md:px-4 md:py-3 ${
            isOpen
              ? "border-indigo-300 bg-white/95 dark:border-indigo-500/50 dark:bg-slate-900/95"
              : "border-slate-200 bg-white/90 hover:border-indigo-200 hover:bg-white/95 dark:border-slate-700 dark:bg-slate-900/90 dark:hover:border-indigo-500/40 dark:hover:bg-slate-900/95"
          }`}
        >
          <div
            className={`transition-colors duration-300 ${isOpen ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 group-hover:text-indigo-500 dark:text-slate-400 dark:group-hover:text-indigo-400"}`}
          >
            <Layers size={22} className="md:h-5 md:w-5" />
          </div>

          <span
            className={`hidden text-xs font-bold transition-colors duration-300 md:block ${isOpen ? "text-indigo-700 dark:text-indigo-300" : "text-slate-600 dark:text-slate-300"}`}
          >
            Tùy chọn lớp
          </span>

          {/* Badge đếm số lớp đang bật */}
          {activeCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-black text-white shadow-sm md:relative md:top-0 md:right-0 md:h-4.5 md:min-w-4.5 dark:bg-indigo-500">
              {activeCount}
            </span>
          )}

          <ChevronDown
            size={14}
            className={`hidden text-slate-400 transition-transform duration-300 md:block dark:text-slate-500 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Panel danh sách lớp */}
        {isOpen && (
          <div className="animate-in fade-in slide-in-from-top-2 absolute top-full left-0 mt-2 w-[calc(100vw-24px)] max-w-72 origin-top-left rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-md duration-200 md:w-72 md:p-3 dark:border-slate-700 dark:bg-slate-900/95">
            {/* Header */}
            <div className="mb-2 border-b border-slate-100 px-1 pb-2 dark:border-slate-800">
              <span className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase dark:text-slate-500">
                Bật/Tắt lớp dữ liệu
              </span>
            </div>

            {/* Layer items */}
            <div className="space-y-1">
              {layerConfigs.map((layer) => {
                const isActive = layerVisibility[layer.id];
                const Icon = layer.icon;
                return (
                  <button
                    key={layer.id}
                    onClick={() => {
                      if (layer.id === "mergeDistricts" && !isActive) {
                        map.setView(locationPHA, 8, {
                          animate: true,
                          duration: 1,
                        });
                      }
                      toggleLayer(layer.id);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl p-2.5 transition-all duration-200 ${
                      isActive
                        ? "border border-indigo-100 bg-indigo-50/80 dark:border-indigo-500/30 dark:bg-indigo-500/10"
                        : "border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ${
                        isActive
                          ? "border-indigo-200 bg-indigo-100 dark:border-indigo-500/40 dark:bg-indigo-500/20"
                          : "border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={`transition-colors duration-200 ${
                          isActive
                            ? "text-indigo-600 dark:text-indigo-400"
                            : layer.iconColor
                        }`}
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 text-left">
                      <p
                        className={`text-xs font-bold transition-colors duration-200 ${
                          isActive
                            ? "text-indigo-700 dark:text-indigo-300"
                            : "text-slate-700 dark:text-slate-200"
                        }`}
                      >
                        {layer.label}
                      </p>
                      <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                        {layer.description}
                      </p>
                    </div>

                    {/* Toggle switch */}
                    <div
                      className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors duration-300 ${
                        isActive
                          ? "bg-indigo-600 dark:bg-indigo-500"
                          : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    >
                      <div
                        className={`h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ${
                          isActive ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(LayerControl);

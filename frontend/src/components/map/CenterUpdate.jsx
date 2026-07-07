import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { locationPHA } from "../../lib/constants";
import { dropdownConfigs } from "../../lib/config/dropdownConfigs";
const CenterUpdater = ({ selectedRegion, setZoomLevel }) => {
  const map = useMap();
  const selectedCenter = dropdownConfigs[2].options.find(
    (opt) => opt.name === selectedRegion,
  ).centerLocation;
  useEffect(() => {
    if (selectedRegion === "Bắc Bộ") {
      map.setMinZoom(7);
      map.setMaxZoom(10);
      // Di chuyển mượt mà về Bắc Bộ
      map.setView(locationPHA, 7, { animate: true, duration: 1 });
      setZoomLevel(7);
    } else if (selectedCenter) {
      map.setMinZoom(1);
      map.setMaxZoom(20);

      map.fitBounds(selectedCenter, { animate: true, duration: 0.8 });

      // Lắng nghe sự kiện di chuyển
      const handleMoveEnd = () => {
        map.setMinZoom(8);
        map.setMaxZoom(10);
        setZoomLevel(8);
      };

      map.once("moveend", handleMoveEnd);

      // Cleanup listener khi component bị unmount hoặc selectRegion thay đổi giữa chừng
      return () => {
        map.off("moveend", handleMoveEnd);
      };
    }
  }, [selectedRegion, selectedCenter, map, setZoomLevel]);
  return null;
};

export default CenterUpdater;

import { MapContainer, TileLayer, Pane } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ProductLayer from "./ProductLayer";
import { useSelection } from "../../context/SelectionContext";
import { useTheme } from "../../context/ThemeContext";
import { GEOSERVER_WMTS_URL } from "../../lib/constants";
import { boundsNorthVN } from "../../lib/constants";

const MapView = () => {
  const { selections } = useSelection();
  const { isDarkMode } = useTheme();

  const selectedRegion = selections.region.name;
  const themeKey = isDarkMode ? "dark" : "light";

  return (
    <main className="z-30 flex min-h-0 w-full flex-1 overflow-hidden">
      <MapContainer
        center={[21.57139, 103.51694]}
        zoom={7.5}
        minZoom={7}
        maxZoom={10}
        zoomSnap={0.1}
        zoomDelta={0.5}
        wheelPxPerZoomLevel={120}
        maxBounds={boundsNorthVN}
        scrollWheelZoom={true}
        className="h-full w-full cursor-pointer!"
        zoomControl={false}
        attributionControl={false}
      >
        <Pane name="Provinces2" style={{ zIndex: 550 }} />
        <Pane name="paneRadar" style={{ zIndex: 600 }} />
        <Pane name="paneProvinces" style={{ zIndex: 660 }} />
        <Pane name="paneDistricts" style={{ zIndex: 650 }} />

        {/* Base Layer */}
        <TileLayer
          key={`layer-base-${themeKey}`}
          url={`https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_${isDarkMode ? "Dark" : "Light"}_Gray_Base/MapServer/tile/{z}/{y}/{x}`}
        />

        {/* North Viet Nam Provinces Mask Layer */}
        <TileLayer
          key={`${themeKey}-provinces-mask`}
          url={`${GEOSERVER_WMTS_URL}?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=radar:new_north_vietnam_2025_provinces&STYLE=radar:${themeKey}-provinces-mask&TILEMATRIXSET=EPSG:3857&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png`}
          pane="Provinces2"
          transparent={true}
        />

        <TileLayer
          key={`${themeKey}_provinces_style`}
          url={`${GEOSERVER_WMTS_URL}?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=radar:new_north_vietnam_2025_provinces&STYLE=radar:${themeKey}_province_style&TILEMATRIXSET=EPSG:3857&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png`}
          pane="paneProvinces"
          transparent={true}
        />

        {["Cấp xã", "Điểm dự báo"].includes(selectedRegion) && (
          <TileLayer
            key={selectedRegion}
            url={`${GEOSERVER_WMTS_URL}?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=radar:${
              selectedRegion === "Cấp xã"
                ? "new_north_vietnam_2025_districts"
                : "new_merge_districts_2025"
            }&STYLE=radar:${
              selectedRegion === "Cấp xã"
                ? "district_style"
                : "merge_district_style"
            }&TILEMATRIXSET=EPSG:3857&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png`}
            pane="paneDistricts"
            transparent={true}
          />
        )}

        {/* Key cố định để tránh unmount khi các layer tĩnh thay đổi cấu trúc */}
        <ProductLayer key="radar-product-layer" />
      </MapContainer>
    </main>
  );
};

export default MapView;

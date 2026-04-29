import {
  Server,
  MapPin,
  SatelliteDish,
  MousePointerClick,
  Newspaper,
  Settings,
} from "lucide-react";

export const defaultSelections = {
  stations: {
    name: "Pha Đin",
  },
  products: {
    name: "MAX",
  },
  region: {
    name: "Sơn La",
  },
};

export const dropdownConfigs = [
  {
    id: "stations",
    label: "Trạm Ra đa thời tiết",
    icon: SatelliteDish,
    iconColor: "text-amber-400",
    options: [
      {
        name: "Pha Đin",
        location: [21.57139, 103.51694],
      },
      {
        name: "Việt Trì",
        location: [21.41944, 105.30472],
      },
      {
        name: "Phù Liễn",
        location: [20.809, 106.64],
      },
    ],
  },
  {
    id: "products",
    label: "Sản phẩm",
    icon: Server,
    iconColor: "text-blue-500",
    options: [
      {
        name: "MAX",
      },
      {
        name: "HMAX",
      },
      {
        name: "VIL",
      },
    ],
  },
  {
    id: "region",
    label: "Tình thành",
    icon: MapPin,
    iconColor: "text-emerald-500",
    options: [
      {
        name: "Sơn La",
      },
      {
        name: "Điện Biên",
      },
      {
        name: "Lai Châu",
      },
    ],
  },
];

export const buttonNavItems = [
  {
    name: "Con trỏ",
    icon: MousePointerClick,
    active: true,
  },
  { name: "Bản tin", icon: Newspaper, active: false },

  { name: "Cài đặt", icon: Settings, active: false },
];

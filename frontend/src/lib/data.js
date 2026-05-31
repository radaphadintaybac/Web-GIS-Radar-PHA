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
    name: "HMAX",
  },
  region: {
    name: "Tất cả",
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
        status: "active",
      },
      {
        name: "Việt Trì",
        location: [21.41944, 105.30472],
        status: "deactive",
      },
      {
        name: "Phù Liễn",
        location: [20.809, 106.64],
        status: "deactive",
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
        status: "active",
      },
      {
        name: "HMAX",
        status: "active",
      },
      {
        name: "VIL",
        status: "deactive",
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
        name: "Tất cả",
        status: "active",
      },
      {
        name: "Sơn La",
        status: "deactive",
      },
      {
        name: "Điện Biên",
        status: "deactive",
      },
      {
        name: "Lai Châu",
        status: "deactive",
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

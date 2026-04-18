import {
  Zap,
  Server,
  Palette,
  MapPin,
  ShieldCheck,
  Globe,
  Activity,
  Code,
  Cpu,
  Compass,
  SatelliteDish
} from "lucide-react";

export const defaultSelections = {
  stations: {
    name: "Pha Đin",
    icon: SatelliteDish,
    color: "text-amber-400",
  },
  products: {
    name: "MAX",
    icon: Server,
    color: "text-blue-500",
  },
  team: {
    name: "Design Team",
    icon: Palette,
    color: "text-pink-500",
  },
  region: {
    name: "Châu Á (APAC)",
    icon: MapPin,
    color: "text-emerald-500",
  },
};

export const dropdownConfigs = [
  {
    id: "stations",
    label: "Trạm Ra đa thời tiết",
    options: [
      {
        name: "Pha Đin",
        icon: SatelliteDish,
        color: "text-amber-400",
      },
      {
        name: "Việt Trì",
        icon: ShieldCheck,
        color: "text-emerald-400",
      },
      {
        name: "Phù Liễn",
        icon: Globe,
        color: "text-blue-400",
      },
    ],
  },
  {
    id: "products",
    label: "Sản phẩm",
    options: [
      {
        name: "MAX",
        icon: Server,
        color: "text-blue-500",
      },
      {
        name: "HMAX",
        icon: Activity,
        color: "text-purple-500",
      },
      {
        name: "VIL",
        icon: Code,
        color: "text-slate-500",
      },
    ],
  },
  {
    id: "team",
    label: "Đội ngũ",
    options: [
      {
        name: "Design Team",
        icon: Palette,
        color: "text-pink-500",
      },
      {
        name: "Engineering",
        icon: Cpu,
        color: "text-indigo-500",
      },
    ],
  },
  {
    id: "region",
    label: "Khu vực",
    options: [
      {
        name: "Châu Á (APAC)",
        icon: MapPin,
        color: "text-emerald-500",
      },
      {
        name: "Bắc Mỹ (NA)",
        icon: Compass,
        color: "text-rose-500",
      },
    ],
  },
];

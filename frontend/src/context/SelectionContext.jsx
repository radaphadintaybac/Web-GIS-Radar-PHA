import { createContext, useContext, useState, useMemo } from "react";
import { defaultSelections } from "../lib/config/dropdownConfigs.js";

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const [selections, setSelections] = useState(defaultSelections);
  const [layerVisibility, setLayerVisibility] = useState({
    radarStations: false,
    mergeDistricts: false,
  });

  const value = useMemo(
    () => ({ selections, setSelections, layerVisibility, setLayerVisibility }),
    [selections, layerVisibility],
  );

  return (
    <SelectionContext.Provider value={value}>
      {" "}
      {children}{" "}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => useContext(SelectionContext);

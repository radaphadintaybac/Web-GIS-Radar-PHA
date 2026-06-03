import React, { createContext, useContext, useState, useMemo } from "react";
import { defaultSelections } from "../../lib/data.js";

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const [selections, setSelections] = useState(defaultSelections);

  const value = useMemo(() => ({ selections, setSelections }), [selections]);

  return (
    <SelectionContext.Provider value={value}>
      {children}
      {console.log("render Selection-context")}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => useContext(SelectionContext);

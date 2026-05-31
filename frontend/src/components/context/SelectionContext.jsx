import React, { createContext, useContext, useState } from "react";
import { defaultSelections } from "../../lib/data.js";

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const [selections, setSelections] = useState(defaultSelections);

  return (
    <SelectionContext.Provider value={{ selections, setSelections }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => useContext(SelectionContext);

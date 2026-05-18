'use client'

import { createContext, useContext, useMemo, useState } from "react"

const defaultContext = {
  selectedWheel: null,
  setWheel: () => {},
  selectedDeck: null,
  setDeck: () => {},
  selectedTruck: null,
  setTruck: () => {},
  selectedBolt: null,
  setBolt: () => {},
};

const CustomControlContext = createContext(defaultContext);

export function CustomControlProvider({
  children,
  defaultWheel,
  defaultDeck,
  defaultTruck,
  defaultBolt,
}) {
  const [selectedWheel, setWheel] = useState(defaultWheel);
  const [selectedDeck, setDeck] = useState(defaultDeck);
  const [selectedTruck, setTruck] = useState(defaultTruck);
  const [selectedBolt, setBolt] = useState(defaultBolt);

  const value = useMemo(() => {
    return {
      selectedWheel,
      setWheel,
      selectedDeck,
      setDeck,
      selectedTruck,
      setTruck,
      selectedBolt,
      setBolt,
    };
  }, [selectedWheel, selectedDeck, selectedTruck, selectedBolt]);

  return (
    <CustomControlContext.Provider value={value}>
      {children}
    </CustomControlContext.Provider>
  );
}

export function useCustomeControlsContext() {
    const context = useContext(CustomControlContext)
    if (!context) {
        throw new Error('useCustomeControlsContext must be used within CustomControlProvider')
    }
    return context
}
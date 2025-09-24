import React, { createContext, useContext, useState } from "react";

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <CarContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => useContext(CarContext);

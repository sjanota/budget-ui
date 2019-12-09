import React, { createContext, useContext, useState } from 'react';

export const MonthContext = createContext();
export const useMonth = () => useContext(MonthContext);

export function MonthProvider({ currentMonth, children }) {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const value = {
    currentMonth,
    selectedMonth,
    setSelectedMonth,
  };
  return (
    <MonthContext.Provider value={value}>{children}</MonthContext.Provider>
  );
}

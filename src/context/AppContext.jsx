import React, { useState } from "react";
import { createContext } from "react";

const Context = createContext({});
export default Context;

export function AppContext({ children }) {

  return (
    <Context.Provider
      value={{
        
      }}
    >
      {children}
    </Context.Provider>
  );
}

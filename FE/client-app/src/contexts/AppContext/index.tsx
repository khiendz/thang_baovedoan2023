"use client"
import React, { createContext, useState, ReactNode, useEffect } from 'react';

type InitialValues = {
    store: any,
    updateStore(key: any, payload: any): void
};

const initialValues: InitialValues = {
  store: {},
  updateStore: (key: any, payload: any) => {},
};

export const AppContext = createContext<InitialValues>(initialValues);

interface AppProviderProps {
  children: any;
  initialValues?: any;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children, initialValues }) => {
  const [state, setState] = useState<any>({...initialValues});
  const value = {
    store: state,
    updateStore: (key: any, payload: any) => {
        setState((prevState: any) => {
            return {
                ...prevState,
                [key]: payload
            }
        });
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

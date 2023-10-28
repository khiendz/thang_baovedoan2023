
'use client'
import { useContext } from 'react';
import { AppContext } from 'contexts';

export const useAppContext = (key: string) => {
  const { store, updateStore } = useContext<any>(AppContext);
  return {
    data: store[key],
    setData: (data: any) => {
      console.log("Data: " + data)
      updateStore(key, data);
    },
  };
};

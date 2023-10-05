import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
    const [dataName, setDataName] = useState('Nguyen Van A')

    useEffect(() => {
        fetchDataNameAccount()
    }, [dataName]);

    const fetchDataNameAccount = useCallback(async () => {
        const res = await fetch(`/api/account`);
        const resJson = await res.json();
        if (resJson) {
            setDataName(resJson.name)
        }
    }, [])
    
    return (
        <DataContext.Provider value={{ dataName }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
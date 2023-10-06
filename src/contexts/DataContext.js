import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const DataContext = createContext();
export function DataProvider({ children }) {
    const [dataContext, setDataContext] = useState({});

    useEffect(() => {
        fetchData()
    }, []);
    const fetchData = useCallback(async () => {
        try {
            const res = await fetch(`/api/account`);
            const resJson = await res.json();
            if (res.status === 200) {
                setDataContext(resJson)
            }
        } catch (error) {
            console.error('Error fetching initial data:', error);
        }
    }, []);

    const updateData = (newData) => {
        setDataContext(newData);
    };
    return (
        <DataContext.Provider value={{ dataContext: dataContext, updateData }}>
            {children}
        </DataContext.Provider>
    );
}
export function useData() {
    return useContext(DataContext);
}

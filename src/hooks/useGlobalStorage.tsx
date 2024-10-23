import React, { useEffect, useState } from 'react'
import GlobalStorage from '../utils/storages/GlobalStorage';

export default function useGlobalStorage(key: string) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        init();
    }, [key])


    const init = async () => {
        setLoading(true);
        try {
            const res = await GlobalStorage.getData(key);
            setData(res);
            setLoading(false)
        } catch (error: any) {
            console.log("Error di useGlobalStorage", error)
            setError(error);
            setLoading(false);
        }
    }


    return { data, loading, error };
}

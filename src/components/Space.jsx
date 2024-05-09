import React, { useEffect, useState } from 'react'
import { stats } from './http/stats';

export default function Space() {
    const [space, setSpace] = useState('fetching');
    useEffect(() => {
        const get = async () => {
            const data = await stats();
            setSpace(data);
        }
        get();
    }, []);
    return (
        <div>used space: {space}</div>
    )
}

import React, { useState } from 'react'
import { caution, down } from './http/Upload';
import Space from './Space';

export default function Controls() {
    const [pwd, setPwd] = useState('');

    function change(e) {
        setPwd(e.target.value);
    }

    return (
        <div>

            <input type='text' value={pwd} onChange={change} />
            <Space />
            <button onClick={() => down(pwd, setPwd)}>done</button>
            <footer style={{ position: 'fixed', bottom: '10px' }}>
                <button onClick={() => caution(pwd, setPwd)}>free</button>
            </footer>
        </div>
    )
}
import { useState } from 'react';
import './index.css';

function ColorPicker() {
    const [color, setColor] = useState('#007BC0');

    const handleColorChange = (e) => {
        setColor(e.target.value);
    };

    return (
        <input
            id="vanilla-picker"
            type="color"
            value={color}
            onChange={handleColorChange}
            className="colorPicker"
        />
    )
}

export default ColorPicker;

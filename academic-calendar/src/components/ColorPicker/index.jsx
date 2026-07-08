import { useState } from 'react';
import './index.css';

function ColorPicker({ color }) {
    const [selectedColor, setSelectedColor] = useState(color ?? "#007BC0");

    return (
        <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="colorPicker"
        />
    );
}

export default ColorPicker;

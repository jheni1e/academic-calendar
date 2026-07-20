import React from 'react';
import './index.css';

function Toggle({ id, leftText, rightText, disabled, onChange }) {
    const checkBoxId = `toggle-label-${id}`;

    return (
        <div className={`a-toggle ${disabled ? '-disabled' : ''}`}>
            <label className="a-toggle__label -left" htmlFor={checkBoxId}>
                {leftText}
            </label>
            <input
                type="checkbox"
                id={checkBoxId}
                name={checkBoxId}
                aria-describedby={checkBoxId}
                onChange={onChange}
                disabled={disabled}
            />
            <label className="a-toggle__box" htmlFor={checkBoxId}></label>
            <label className="a-toggle__label -right" htmlFor={checkBoxId}>
                {rightText}
            </label>
        </div>
    );
}

export default Toggle;
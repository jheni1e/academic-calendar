import React, { forwardRef } from 'react';
import './index.css';
import downArrow from '../../images/DownArrow.svg';

function DropdownList({ label, options, selectedValue, onChange, disabled }, ref) {
    const isDisabled = selectedValue === "";
    console.log(options)
    return (
        <div className="a-dropdown a-dropdown--dynamic-width">
            <label>{label}</label>
            <div style={{ position: 'relative' }}>
                <select id="dropdown" value={selectedValue} onChange={onChange} ref={ref} disabled={disabled}>
                    <option value="" disabled selected={!selectedValue}>Select an option</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.name}>{option.name}</option>
                    ))}
                </select>
                {!disabled && <img src={downArrow} className="dropdown-arrow" alt="dropdown arrow" />}
            </div>
        </div>
    );
}

export default forwardRef(DropdownList);
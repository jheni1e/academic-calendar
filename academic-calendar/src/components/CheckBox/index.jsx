import React from 'react';
import './index.css';
import CheckmarkWhite from '../../images/CheckmarkWhite.svg';

function CheckBox({ id, label, isChecked, onCheckboxChange, ...rest }) {
    return (
        <div className="checkboxContainer">
            <label htmlFor={id} className={`checkboxLabel ${isChecked ? "checked" : ""}`}>
                <input 
                    type="checkbox" 
                    id={id} 
                    name={label} 
                    checked={isChecked} 
                    onChange={onCheckboxChange} 
                    className="hiddenCheckbox" 
                    {...rest} 
                />
                <div className="fakeCheckbox">
                    {isChecked && <img src={checkmarkWhite} className='imgCheckMark' alt='checkmark' />}
                </div>
                {label}
            </label>
        </div>
    );
}

export default CheckBox;
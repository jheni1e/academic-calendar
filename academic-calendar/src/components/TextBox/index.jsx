import React, { useState, forwardRef } from 'react';
import './index.css'

function TextBox({ label, isBigInput, hasError, errorText, hasWarning, warningText, isSearchInput, searchMet, isPasswordInput, ...rest }, ref) { 
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputClassName = isFocused ? 'input focused' : 'input';
    const bigInputClassName = isFocused ? 'big-input focused' : 'big-input';
    const InputElement = isBigInput ? 'textarea' : 'input';
    const inputType = isPasswordInput ? (showPassword ? 'text' : 'password') : 'text';
    
    const handlePasswordToggle = () => {
        setShowPassword(prevState => !prevState);
    }

    return (
        <div className={`a-text-field ${isPasswordInput ? 'a-text-field--password' : ''} ${isSearchInput ? 'a-text-field--search' : ''}`} style={{width: '100%'}}>
            <label htmlFor="5">{label}</label>
            <InputElement
                id="5"
                type={inputType}
                className={isBigInput ? bigInputClassName : inputClassName}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                placeholder="Digite algo..."
                {...rest}
                ref={ref}
            />
            {isSearchInput && (
                <button type="button" className="a-text-field__icon-search" onClick={(e) => searchMet(e)}>
                    <i className="a-icon ui-ic-search" title="Search"></i>
                </button>
            )}
            {isPasswordInput && (
                <button type="button" className="a-text-field__icon-password" onClick={handlePasswordToggle}>
                    <i className={`a-icon ${showPassword ? 'ui-ic-watch-off' : 'ui-ic-watch-on'}`} title={showPassword ? 'Hide Password' : 'Show Password'}></i>
                </button>
            )}
        </div>
    );
}

export default forwardRef(TextBox);
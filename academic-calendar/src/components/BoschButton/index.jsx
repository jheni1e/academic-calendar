import React, { forwardRef } from 'react';
import './index.css';

function BoschButton({ text, type, isPaginationButton, ...rest }, ref) { 
    const buttonClass = isPaginationButton ? 'paginationButton' : '';

    return (
        <div className="container">
            {type === "primary" && 
            <button className={`primaryButton ${buttonClass}`} {...rest} ref={ref}>
                <span className="text">{text}</span>
            </button>
            }
            {type === "secondary" && 
            <button className={`secondaryButton ${buttonClass}`} {...rest} ref={ref}>
                <span className="secondaryText">{text}</span>
            </button>
            }
            {type === "terciary" && 
            <button className={`terciaryButton ${buttonClass}`} {...rest} ref={ref}>
                <span className="secondaryText">{text}</span>
            </button>
            }
            {type === "disabled" && 
            <button className={`disabledButton ${buttonClass}`} {...rest} ref={ref} disabled={true}>
                <span className="disabledText">{text}</span>
            </button>
            }
        </div>
    );
}

export default forwardRef(BoschButton);
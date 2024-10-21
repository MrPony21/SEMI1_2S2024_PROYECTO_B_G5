import React, {forwardRef} from "react";
import "./input.css"

function Input( {value, placeholder, onChange , name, type, required }){

    return (
        <input 
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{
            marginLeft: '10px',
            borderRadius: '10px',
            border: 'none',
            width: '85%',
            height: '50%',
            fontSize: '16px'
        }}
        onFocus={(e) => e.target.style.outline = 'none'}
        />

    )

}

  
export default Input;
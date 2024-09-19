import React, { useRef, useState } from 'react';

export default function QueryBox({inputHeight, inputWidth, areaHeight, querytxt, handleAreaChange, handleSubmit}) {
    const [height, setHeight] = useState(inputHeight);
    const textareaRef = useRef(null);
    const maxHeight = 200; // Define the maximum height limit here

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight)
            setHeight(newHeight)
        }
    };

    return (
        <textarea 
            ref={textareaRef}
            style={{ 
                backgroundColor: "#F8F8F8",
                width: inputWidth, 
                height: height,
                fontSize: inputHeight-14, 
                border: '1px solid #D3D3D3', 
                position: 'absolute', 
                left: '50%', 
                top: window.innerHeight / 2 + inputHeight / 2 + areaHeight / 2,
                transform: 'translate(-50%, -50%)', 
                borderRadius: '10px',
                overflowY: "scroll",
                resize: 'none'
            }} 
            placeholder="Message" 
            value={querytxt} 
            onChange={(e) => {
                handleAreaChange(e)
                adjustHeight()
            }
            }
            onKeyDown={handleEnter}
        />
    )
}
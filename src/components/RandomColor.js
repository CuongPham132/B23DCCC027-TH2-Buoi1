import React, { useState, useEffect, useRef } from 'react';

const RandomColor = () => {
    const [currentColor, setCurrentColor] = useState('#ffffff');
    const [colorHistory, setColorHistory] = useState([]);
    const [isAutoChanging, setIsAutoChanging] = useState(false);
    const intervalRef = useRef(null);

    const generateRandomColor = () => {
        const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        setCurrentColor(color);
        setColorHistory(prevHistory => [color, ...prevHistory.slice(0, 4)]);
    };

    const undoColor = () => {
        if (colorHistory.length > 0) {
            const [prevColor, ...newHistory] = colorHistory;
            setCurrentColor(prevColor);
            setColorHistory(newHistory);
        }
    };

    const toggleAutoChange = () => {
        setIsAutoChanging(!isAutoChanging);
    };

    useEffect(() => {
        if (isAutoChanging) {
            intervalRef.current = setInterval(generateRandomColor, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isAutoChanging]);

    const getColorName = (hexColor) => {
        const colors = {
            '#FF0000': 'Red',
            '#00FF00': 'Green',
            '#0000FF': 'Blue',
            '#FFFF00': 'Yellow',
            '#FF00FF': 'Magenta',
            '#00FFFF': 'Cyan',
            '#000000': 'Black',
            '#FFFFFF': 'White',
            '#808080': 'Gray',
            '#800000': 'Maroon',
            '#808000': 'Olive',
            '#008000': 'Dark Green',
            '#800080': 'Purple',
            '#008080': 'Teal',
            '#000080': 'Navy',
        };
        
        return colors[hexColor.toUpperCase()] || 'Unknown';
    };

    return (
        <div className="random-color">
            <h2>Màu Ngẫu Nhiên</h2>
            <div className="color-boxes">
                <div className="color-box">
                    <h3>Current Color:</h3>
                    <div style={{ backgroundColor: currentColor, padding: '20px', marginBottom: '10px' }}>
                        {currentColor} ({getColorName(currentColor)})
                    </div>
                </div>
                <div className="color-box">
                    <h3>Color History:</h3>
                    {colorHistory.map((color, index) => (
                        <div key={index} style={{ backgroundColor: color, padding: '10px', marginBottom: '5px' }}>
                            {color} ({getColorName(color)})
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={generateRandomColor}>Đổi màu nền</button>
            <button onClick={undoColor} disabled={colorHistory.length === 0}>Hoàn tác</button>
            <button onClick={toggleAutoChange}>{isAutoChanging ? 'Dừng tự động' : 'Bắt đầu tự động'}</button>
        </div>
    );
};

export default RandomColor;

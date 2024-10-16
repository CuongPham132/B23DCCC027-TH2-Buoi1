import React, { useState } from 'react';
import axios from 'axios';

const ImageSearch = () => {
    const [searchInput, setSearchInput] = useState('');
    const [images, setImages] = useState([]);

    const searchImages = async () => {
        if (!searchInput) return; // Kiểm tra nếu ô tìm kiếm trống
        const response = await axios.get(`https://pixabay.com/api/?key=46166847-40e887f0f1cbd269c98d3b401&q=${searchInput}&image_type=photo`);
        setImages(response.data.hits);
    };

    return (
        <div className="image-search">
            <h2>Tìm Kiếm Hình Ảnh</h2>
            <input 
                type="text" 
                value={searchInput} 
                onChange={(e) => setSearchInput(e.target.value)} 
                placeholder="Tìm kiếm hình ảnh..."
            />
            <button onClick={searchImages}>Tìm Kiếm</button>
            <div className="image-results">
                {images.map((image) => (
                    <img key={image.id} src={image.previewURL} alt={image.tags} style={{ width: '100px', margin: '5px' }} />
                ))}
            </div>
        </div>
    );
};

export default ImageSearch;

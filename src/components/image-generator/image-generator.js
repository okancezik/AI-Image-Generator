import React, { useEffect, useRef, useState } from 'react'
import PugImage from '../../assets/images/pug.png';
import Dali from '../../assets/images/dall-i.png';

import './image-generator.css'

const ImageGenerator = () => {

    const [loading, setLoading] = useState(false)
    const [image_url, setImage_url] = useState("/")
    const inputRef = useRef(null)

    const imageGenerate = async () => {
        console.log("USER: ", inputRef.current.value)
        if (inputRef.current.value === "") {
            return 0;
        }
        setLoading(true)
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                //"Bearer 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",
                "Bearer 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"
            },
            body: JSON.stringify({
                prompt: `${inputRef.current.value}`,
                n: 1,
                //size: "512x512",
                model: "dall-e-2",
            })
        });

        const data = await response.json()
        console.log(data)
        setImage_url(data.data[0].url)
        setLoading(false)
    }

    useEffect(()=>{},[image_url])

    return (
        <div className='ai-image-generator'>
            <div className='header'>
                Dal(l)||(i)-E <span>Generate</span>
            </div>
            <div className='img-loading'>
                <div className='image'><img src={image_url === "/" ? Dali : image_url} alt='pug' /></div>
                <div className='loading'>
                    <div className={loading ? "loading-bar-full" : "loading-bar"}>

                    </div>
                    <div className={loading ? "loading-text" : "display-none"}>
                        Loading...
                    </div>

                </div>
            </div>
            <div className='search-box'>
                <input type='text' ref={inputRef} className='search-input' placeholder='Görmek istediğin şeyi açıkla...' />
                <div className='generate-btn' onClick={() => imageGenerate()}>
                    Generate
                </div>
            </div>
        </div>
    )
}

export default ImageGenerator
'use client';

import { useState, useEffect } from 'react';

const images = [
    "https://www.bracu.ac.bd/sites/default/files/uploads/2025/07/01/sun_drance.jpg"
];

export default function HeroSlideShow() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 z-0">
            {images.map((img, i) => (
                <div
                    key={img}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{ backgroundImage: `url('${img}')` }}
                />
            ))}
          
            <div className="absolute inset-0 bg-slate-950/80"></div>

           
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-indigo-500 w-6' : 'bg-white/30 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

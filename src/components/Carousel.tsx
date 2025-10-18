import { useState, useEffect } from 'react';

export interface CarouselImage {
    src: string;
    alt: string;
}

export interface CarouselProps {
    images: CarouselImage[];
    autoPlay?: boolean;
    interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ images, autoPlay = false, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const indicesToPreload = [
            currentIndex,
            (currentIndex + 1) % images.length,
            (currentIndex - 1 + images.length) % images.length
        ];
        indicesToPreload.forEach((index) => {
            if (!loadedImages.has(index)) {
                const img = new Image();
                img.src = images[index].src;
                img.onload = () => {
                    setLoadedImages(prev => new Set([...prev, index]));
                };
                img.onerror = () => {
                    console.error(`Failed to load image: ${images[index].src}`);
                };
            }
        });
    }, [currentIndex, images, loadedImages]);
    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [autoPlay, interval, images.length]);
    const goToSlide = (index: number): void => {
        setCurrentIndex(index);
    };
    const goToNext = (): void => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };
    const goToPrev = (): void => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    const handleImageLoad = (): void => {
        setIsLoading(false);
    };
    const handleImageError = (): void => {
        console.error('Failed to load current image');
        setIsLoading(false);
    };
    return (
      <div className="carousel relative w-full max-w-4xl mx-auto">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <span>در حال بارگیری تصویر...</span>
          </div>
        )}
        <img key={currentIndex} src={images[currentIndex].src} alt={images[currentIndex].alt}
          className={`carousel-img w-full h-auto transition-opacity duration-300 ${ isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad} onError={handleImageError} loading={currentIndex === 0 ? "eager" : "lazy"} decoding="async"/>
        <button onClick={goToPrev} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">‹</button>
        <button onClick={goToNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">›</button>
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}/>
          ))}
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          {loadedImages.has(currentIndex) ? 'loaded' : 'loading ...'}
        </div>
      </div>
    );
};

export default Carousel;
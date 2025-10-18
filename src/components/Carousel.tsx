import { useState, useEffect, useRef, useCallback } from 'react';
import i18n from "../i18n/i18n";

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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const loadedImagesRef = useRef<Set<number>>(new Set([0]));
    const timeoutRef = useRef<number | null>(null);
    const currentIndexRef = useRef<number>(0);
    const transitionTimeoutRef = useRef<number | null>(null);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const minSwipeDistance = 50;
    const lang = i18n.language;
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                window.clearInterval(timeoutRef.current);
            }
            if (transitionTimeoutRef.current) {
                window.clearTimeout(transitionTimeoutRef.current);
            }
        };
    }, []);
    const preloadImages = useCallback((index: number) => {
        const indicesToPreload = [
            index,
            (index + 1) % images.length,
            (index - 1 + images.length) % images.length
        ];
        indicesToPreload.forEach((preloadIndex) => {
            if (!loadedImagesRef.current.has(preloadIndex)) {
                const img = new Image();
                img.src = images[preloadIndex].src;
                img.onload = () => {
                    loadedImagesRef.current.add(preloadIndex);
                };
                img.onerror = () => {
                    console.error(`Failed to preload image: ${images[preloadIndex].src}`);
                };
            }
        });
    }, [images]);
    useEffect(() => {
        preloadImages(currentIndex);
    }, [currentIndex, preloadImages]);
    useEffect(() => {
        if (!autoPlay) return;  
        timeoutRef.current = window.setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length);
        }, interval);
        return () => {
            if (timeoutRef.current) {
                window.clearInterval(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [autoPlay, interval, images.length]);
    const goToSlide = useCallback((index: number, direction: 'left' | 'right'): void => {
        if (index === currentIndexRef.current || isTransitioning) return;
        setIsTransitioning(true);
        setSlideDirection(direction);
        setCurrentIndex(index);
        setIsLoading(true);
        if (transitionTimeoutRef.current) {
            window.clearTimeout(transitionTimeoutRef.current);
        }
        transitionTimeoutRef.current = window.setTimeout(() => {
            setIsTransitioning(false);
            setSlideDirection(null);
        }, 500);
    }, [isTransitioning]);
    const goToNext = useCallback((): void => {
        const nextIndex = (currentIndexRef.current + 1) % images.length;
        goToSlide(nextIndex, 'left');
    }, [goToSlide, images.length]);
    const goToPrev = useCallback((): void => {
        const prevIndex = (currentIndexRef.current - 1 + images.length) % images.length;
        goToSlide(prevIndex, 'right');
    }, [goToSlide, images.length]);
    const handleImageLoad = useCallback((): void => {
        setIsLoading(false);
    }, []);
    const handleImageError = useCallback((): void => {
        console.error('Failed to load current image');
        setIsLoading(false);
    }, []);
    const isImagePreloaded = useCallback((index: number): boolean => {
        return loadedImagesRef.current.has(index);
    }, []);
    const getSlideClasses = useCallback((): string => {
        if (!slideDirection) return '';
        return slideDirection === 'left' ? 'slide-in-left' : 'slide-in-right';
    }, [slideDirection]);
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (isTransitioning) return;
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    }, [isTransitioning]);
    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!touchStart) return;
        setTouchEnd(e.targetTouches[0].clientX);
    }, [touchStart]);
        const handleTouchEnd = useCallback(() => {
        if (!touchStart || !touchEnd || isTransitioning) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrev();
        }
        setTouchStart(null);
        setTouchEnd(null);
    }, [touchStart, touchEnd, isTransitioning, goToNext, goToPrev]);
    return (
        <div className="carousel relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg"
                ref={carouselRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}>
            {isLoading && (
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center z-10">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-3"></div>
                        <p className="text-gray-600 dark:text-gray-300">
                            {isImagePreloaded(currentIndex) ? 'Almost ready...' : 'Loading image...'}
                        </p>
                    </div>
                </div>
            )}
            <div className={`relative w-full h-100 md:h-120 ${getSlideClasses()}`}>
                <img 
                    key={currentIndex} 
                    src={images[currentIndex].src} 
                    alt={images[currentIndex].alt}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                        isLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoad={handleImageLoad} 
                    onError={handleImageError} 
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <button 
                onClick={goToNext} 
                disabled={isTransitioning}
                className={`hidden sm:block absolute top-1/2 transform -translate-y-1/2 
                        ${lang === "fa" ? "translate-x-1/2 left-0" : "-translate-x-1/2 right-0" }
                        bg-custom-gold/50 text-white rounded-full hover:bg-custom-gold/90 
                        transition-all disabled:opacity-50 disabled:cursor-not-allowed z-20
                        w-12 h-12 flex items-center justify-center cursor-pointer`}
            >
                <span className="text-2xl leading-none pb-1">›</span>
            </button>
            <button 
                onClick={goToPrev} 
                disabled={isTransitioning}
                className={`hidden sm:block absolute top-1/2 transform -translate-y-1/2
                        ${lang === "fa" ? "-translate-x-1/2 right-0" : "translate-x-1/2 left-0" }
                        bg-custom-gold/50 text-white rounded-full hover:bg-custom-gold/90 
                        transition-all disabled:opacity-50 disabled:cursor-not-allowed z-20
                        w-12 h-12 flex items-center justify-center cursor-pointer`}
            >
                <span className="text-2xl leading-none pb-1">‹</span>
            </button>
            <div className="flex justify-center mt-4 space-x-1 sm:space-x-3 mb-1">
                {images.map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => goToSlide(index, index > currentIndex ? 'left' : 'right')}
                        disabled={isTransitioning}
                        className={`cursor-pointer relative transition-all duration-300 w-2 h-2 sm:w-3.5 sm:h-3.5 rounded-full 
                            ${index === currentIndex 
                                ? 'scale-125 bg-custom-gold' 
                                : 'bg-gray-300 hover:bg-gray-400'
                        } ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
                    >
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
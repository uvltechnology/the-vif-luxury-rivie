import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export function OptimizedImage({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  priority = false,
  quality = 85,
  objectFit = 'cover',
  onLoad,
  blurDataURL,
  sizes,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px',
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [priority])

  const handleLoad = (e) => {
    setIsLoaded(true)
    onLoad?.(e)
  }

  return (
    <div 
      ref={imgRef}
      className={cn('relative overflow-hidden', className)}
      style={{ 
        width: width || '100%', 
        height: height || '100%',
      }}
    >
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse"
          style={{
            backgroundImage: blurDataURL ? `url(${blurDataURL})` : 'none',
            backgroundSize: 'cover',
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
          }}
        />
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          sizes={sizes}
          className={cn(
            'w-full h-full transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
          )}
          style={{
            objectFit,
            imageRendering: 'auto',
            willChange: isLoaded ? 'auto' : 'opacity',
          }}
          {...props}
        />
      )}
    </div>
  )
}

export function OptimizedBackgroundImage({ 
  src, 
  className, 
  children,
  priority = false,
  overlay = false,
  overlayOpacity = 0.3,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const divRef = useRef(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '100px',
      }
    )

    if (divRef.current) {
      observer.observe(divRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [priority])

  useEffect(() => {
    if (!isInView) return

    const img = new Image()
    img.src = src
    img.onload = () => setIsLoaded(true)
  }, [isInView, src])

  return (
    <div 
      ref={divRef}
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {isInView && (
        <div
          className={cn(
            'absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            backgroundImage: `url(${src})`,
            imageRendering: 'auto',
            willChange: isLoaded ? 'auto' : 'opacity',
          }}
        />
      )}
      
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

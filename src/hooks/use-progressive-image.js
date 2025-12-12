import { useState, useEffect } from 'react'

export function useProgressiveImage(src, lowQualitySrc) {
  const [sourceLoaded, setSourceLoaded] = useState(null)

  useEffect(() => {
    if (lowQualitySrc) {
      setSourceLoaded(lowQualitySrc)
    }

    const img = new Image()
    img.src = src

    img.onload = () => {
      setSourceLoaded(src)
    }

    return () => {
      img.onload = null
    }
  }, [src, lowQualitySrc])

  return sourceLoaded
}

export function useImagePreload(images) {
  const [loadedImages, setLoadedImages] = useState([])

  useEffect(() => {
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => resolve(src)
        img.onerror = reject
      })
    })

    Promise.all(imagePromises)
      .then((loaded) => setLoadedImages(loaded))
      .catch((err) => console.error('Image preload error:', err))
  }, [images])

  return loadedImages
}

export function useIntersectionObserver(ref, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    })

    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref, options])

  return isIntersecting
}

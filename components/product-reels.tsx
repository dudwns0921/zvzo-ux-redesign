"use client"

import { useState, useRef, useEffect } from "react"
import { ExternalLink } from "lucide-react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Mousewheel } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

// Swiper 스타일 import
import 'swiper/css'
import 'swiper/css/effect-fade'

interface Product {
  id: number
  video: string
  title: string
  brand: string
  price: number
}

export function ProductReels() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/products')
        if (!response.ok) throw new Error('Failed to fetch products')
        const data = await response.json()
        setProducts(data)
        // 비디오 참조 배열 초기화
        videoRefs.current = new Array(data.length).fill(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const currentProduct = products[currentIndex]

  // 슬라이드 변경 시 비디오 재생/일시정지 관리
  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.realIndex
    setCurrentIndex(newIndex)
    
    // 모든 비디오 일시정지
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause()
      }
    })
    
    // 현재 비디오만 재생
    const currentVideo = videoRefs.current[newIndex]
    if (currentVideo) {
      currentVideo.play().catch(console.log)
    }
  }

  // 비디오 참조 설정
  const setVideoRef = (index: number) => (ref: HTMLVideoElement | null) => {
    videoRefs.current[index] = ref
  }

  // 초기 비디오 재생
  useEffect(() => {
    if (products.length > 0 && videoRefs.current[0]) {
      videoRefs.current[0].play().catch(console.log)
    }
  }, [products.length])

  const handleProductLink = () => {
    console.log("[v0] Navigate to product detail page:", currentProduct.id)
    // UI only - no actual navigation
  }

  if (loading) {
    return (
      <div className="h-full w-full bg-black relative flex flex-col items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    )
  }

  if (error || products.length === 0) {
    return (
      <div className="h-full w-full bg-black relative flex flex-col items-center justify-center">
        <p className="text-red-500">오류 발생: {error || '상품을 불러올 수 없습니다'}</p>
      </div>
    )
  }

  if (!currentProduct) {
    return (
      <div className="h-full w-full bg-black relative flex flex-col items-center justify-center">
        <p className="text-gray-500">상품이 없습니다</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full bg-black relative">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        mousewheel={{
          thresholdDelta: 70,
          releaseOnEdges: true,
        }}
        modules={[Mousewheel]}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
      >
        {products.map((product, index) => (
          <SwiperSlide key={product.id} className="h-full w-full relative">
            <video
              ref={setVideoRef(index)}
              src={product.video}
              className="absolute inset-0 w-full h-full object-cover"
              loop
              muted
              playsInline
              poster="/fashion-product-loading.jpg"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6 pt-16">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">{product.brand}</p>
                  <h2 className="text-2xl font-bold text-white mt-1">{product.title}</h2>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white">{product.price.toLocaleString()}원</p>
                  </div>
                </div>

                <button
                  onClick={handleProductLink}
                  className="w-full bg-white text-black font-semibold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors active:scale-98"
                >
                  <span>제품 상세보기</span>
                  <ExternalLink size={20} />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

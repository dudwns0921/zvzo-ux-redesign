"use client"

import { Trash2 } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

interface CartItem {
  id: number
  title: string
  brand: string
  price: number
  quantity: number
  image: string
}

export function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/cart')
        if (!response.ok) throw new Error('Failed to fetch cart')
        const data = await response.json()
        setItems(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching cart:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
    } else {
      setItems(items.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (loading) {
    return (
      <div className="h-full w-full flex flex-col bg-white overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
          <h1 className="text-2xl font-bold text-black">장바구니</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full w-full flex flex-col bg-white overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
          <h1 className="text-2xl font-bold text-black">장바구니</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">오류 발생: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full flex flex-col bg-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <h1 className="text-2xl font-bold text-black">장바구니</h1>
        <p className="text-sm text-gray-600 mt-1">{items.length}개 상품</p>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex gap-4 hover:bg-gray-100 transition-colors">
              <div className="relative w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-600">{item.brand}</p>
                  <h3 className="font-bold text-black text-sm mt-1 line-clamp-2">{item.title}</h3>
                </div>
                <p className="text-black font-bold text-sm">{item.price.toLocaleString()}원</p>
              </div>

              <div className="flex flex-col items-end justify-between gap-3">
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
                <div className="flex items-center gap-1 bg-gray-200 border border-gray-300 rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-600 hover:text-black text-lg"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 text-sm font-medium min-w-8 text-center text-black">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:text-black text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <p className="text-lg font-medium">장바구니가 비어있습니다</p>
            <p className="text-sm mt-1">꿀템찾기에서 상품을 추가해보세요</p>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      {items.length > 0 && (
        <div className="bg-white border-t border-gray-200 px-4 py-4 space-y-3 sticky bottom-0">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">합계</span>
            <span className="text-3xl font-bold text-black">{totalPrice.toLocaleString()}원</span>
          </div>
          <button className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-colors font-bold text-lg">
            결제하기
          </button>
        </div>
      )}
    </div>
  )
}

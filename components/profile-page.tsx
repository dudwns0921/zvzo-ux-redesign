"use client"

import { Heart, Settings, LogOut } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

interface UserProfile {
  name: string
  handle: string
  followers: number
  following: number
  avatar: string
}

interface Favorite {
  id: number
  title: string
  brand: string
  price: number
  image: string
}

interface ProfileData {
  user: UserProfile
  favorites: Favorite[]
}

export function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/profile')
        if (!response.ok) throw new Error('Failed to fetch profile')
        const data = await response.json()
        setProfileData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching profile:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="h-full w-full flex flex-col bg-white overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center z-10">
          <h1 className="text-2xl font-bold text-black">마이페이지</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (error || !profileData) {
    return (
      <div className="h-full w-full flex flex-col bg-white overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center z-10">
          <h1 className="text-2xl font-bold text-black">마이페이지</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">오류 발생: {error}</p>
        </div>
      </div>
    )
  }

  const { user, favorites } = profileData
  return (
    <div className="h-full w-full flex flex-col bg-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center z-10">
        <h1 className="text-2xl font-bold text-black">마이페이지</h1>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings size={24} className="text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile Section */}
        <div className="bg-gray-50 px-4 py-6 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <div className="relative w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-black">{user.name}</h2>
              <p className="text-sm text-gray-600 mt-0.5">{user.handle}</p>
              <div className="flex gap-8 mt-4">
                <div>
                  <p className="text-xl font-bold text-black">{(user.followers / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-600 mt-1">팔로워</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-black">{(user.following / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-600 mt-1">팔로잉</p>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 border-2 border-black text-black py-2 rounded-lg hover:bg-gray-100 transition-colors font-bold text-sm">
            프로필 수정
          </button>
        </div>

        {/* Favorites Section */}
        <div className="px-4 py-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Heart size={20} className="text-black fill-black" />
            <h3 className="text-xl font-bold text-black">찜한 상품</h3>
            <span className="text-sm text-gray-600 ml-auto">{favorites.length}개</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {favorites.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors">
                <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <button className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-md">
                    <Heart size={18} className="text-black fill-black" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-600">{item.brand}</p>
                  <h4 className="text-sm font-bold text-black mt-1 line-clamp-2">{item.title}</h4>
                  <p className="text-black font-bold text-sm mt-2">{item.price.toLocaleString()}원</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Sections */}
        <div className="px-4 py-4 space-y-1">
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors font-medium text-black">
            주문 내역
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors font-medium text-black">
            배송 정보
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors font-medium text-black">
            결제 수단
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors font-medium text-black">
            고객 지원
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors font-medium text-red-600">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  )
}

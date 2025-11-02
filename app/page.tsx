"use client"

import type React from "react"

import { useState } from "react"
import { ShoppingBag, User, Home } from "lucide-react"
import { ProductReels } from "@/components/product-reels"
import { CartPage } from "@/components/cart-page"
import { ProfilePage } from "@/components/profile-page"

type Page = "home" | "cart" | "profile"

export default function Main() {
  const [currentPage, setCurrentPage] = useState<Page>("home")

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex items-center justify-center flex-1 overflow-hidden">
        <div className="w-full max-w-[500px] h-full bg-black flex flex-col">
          {/* Main Content Area - Takes all remaining space */}
          <div className="flex-1 overflow-hidden">
            {currentPage === "home" && <ProductReels />}
            {currentPage === "cart" && <CartPage />}
            {currentPage === "profile" && <ProfilePage />}
          </div>
        </div>
      </div>
      <nav className="w-screen border-t border-gray-800 bg-black px-0 py-0 flex h-16">
        <NavButton
          icon={<Home size={24} />}
          label="꿀템찾기"
          isActive={currentPage === "home"}
          onClick={() => setCurrentPage("home")}
        />
        <NavButton
          icon={<ShoppingBag size={24} />}
          label="장바구니"
          isActive={currentPage === "cart"}
          onClick={() => setCurrentPage("cart")}
        />
        <NavButton
          icon={<User size={24} />}
          label="마이페이지"
          isActive={currentPage === "profile"}
          onClick={() => setCurrentPage("profile")}
        />
      </nav>
    </div>
  )
}

interface NavButtonProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

function NavButton({ icon, label, isActive, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center transition-colors ${
        isActive ? "text-white border-t-2 border-white" : "text-gray-500 hover:text-gray-300"
      }`}
    >
      {icon}
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  )
}

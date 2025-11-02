import { NextResponse } from 'next/server'

interface CartItem {
  id: number
  title: string
  brand: string
  price: number
  quantity: number
  image: string
}

const MOCK_CART: CartItem[] = [
  {
    id: 1,
    title: "Modern Zip Hoodie",
    brand: "Letters Archive",
    price: 89000,
    quantity: 1,
    image: "https://picsum.photos/id/10/400/400",
  },
  {
    id: 3,
    title: "Classic Denim Jacket",
    brand: "Denim Co",
    price: 125000,
    quantity: 1,
    image: "https://picsum.photos/id/20/400/400",
  },
  {
    id: 5,
    title: "Minimalist Sneakers",
    brand: "Step Fashion",
    price: 110000,
    quantity: 2,
    image: "https://picsum.photos/id/30/400/400",
  },
]

export async function GET() {
  try {
    // 실제 API 호출이 필요한 경우 여기에 구현
    return NextResponse.json(MOCK_CART)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

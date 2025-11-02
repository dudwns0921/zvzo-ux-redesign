import { NextResponse } from 'next/server'

interface Product {
  id: number
  video: string
  title: string
  brand: string
  price: number
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Modern Zip Hoodie",
    brand: "Letters Archive",
    price: 89000,
  },
  {
    id: 2,
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Oversized T-Shirt",
    brand: "Urban Style",
    price: 45000,
  },
  {
    id: 3,
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Classic Denim Jacket",
    brand: "Denim Co",
    price: 125000,
  },
  {
    id: 4,
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Cargo Pants",
    brand: "Street Wear",
    price: 95000,
  },
  {
    id: 5,
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Minimalist Sneakers",
    brand: "Step Fashion",
    price: 110000,
  },
]

export async function GET() {
  try {
    // 실제 API 호출이 필요한 경우 여기에 구현
    return NextResponse.json(MOCK_PRODUCTS)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

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

interface ProfileResponse {
  user: UserProfile
  favorites: Favorite[]
}

const USER_PROFILE: UserProfile = {
  name: "Park Mi-sun",
  handle: "@s0Is0ls01",
  followers: 17300,
  following: 1240,
  avatar: "https://picsum.photos/id/64/150/150",
}

const FAVORITE_ITEMS: Favorite[] = [
  {
    id: 1,
    title: "Modern Zip Hoodie",
    brand: "Letters Archive",
    price: 89000,
    image: "https://picsum.photos/id/10/300/300",
  },
  {
    id: 3,
    title: "Classic Denim",
    brand: "Denim Co",
    price: 125000,
    image: "https://picsum.photos/id/20/300/300",
  },
  {
    id: 4,
    title: "Cargo Pants",
    brand: "Street Wear",
    price: 95000,
    image: "https://picsum.photos/id/40/300/300",
  },
  {
    id: 2,
    title: "Oversized T-Shirt",
    brand: "Urban Style",
    price: 45000,
    image: "https://picsum.photos/id/50/300/300",
  },
]

export async function GET() {
  try {
    // 실제 API 호출이 필요한 경우 여기에 구현
    const response: ProfileResponse = {
      user: USER_PROFILE,
      favorites: FAVORITE_ITEMS,
    }
    return NextResponse.json(response)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/links`, {
      headers: {
        "x-token": process.env.X_TOKEN || "",
      },
      next: { revalidate: 60 }, 
    })

    if (!response.ok) {
      console.error(`Backend API error: ${response.status}`)
      return NextResponse.json({ error: "Failed to fetch links from backend" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching links:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(`${process.env.BASE_URL}/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": process.env.X_TOKEN || "",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      console.error(`Backend API error: ${response.status}`)
      return NextResponse.json({ error: "Failed to create short link" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating short link:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}


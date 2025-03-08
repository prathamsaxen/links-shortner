import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const slug = url.pathname.replace("/api/", ""); // Extract slug from URL

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // Make request to the backend API to get the original link
    const response = await fetch(`${process.env.BASE_URL}/${slug}`, {
      headers: {
        "x-token": process.env.X_TOKEN || "",
      },
    });

    if (!response.ok) {
      console.error(`Backend API error: ${response.status}`);
      return NextResponse.json({ error: "Failed to retrieve original link" }, { status: response.status });
    }

    const data = await response.json();

    if (!data.originalLink) {
      return NextResponse.json({ error: "No redirect URL found" }, { status: 404 });
    }

    // Return the original link data
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error retrieving original link:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

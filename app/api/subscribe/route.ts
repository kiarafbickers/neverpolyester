import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  const apiKey = process.env.API_SECRET_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    return NextResponse.json(
      { message: "API key or Publication ID is missing" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ email }),
      }
    );

    if (response.ok) {
      return NextResponse.json({ message: "Subscription successful" });
    } else {
      const data = await response.json();
      return NextResponse.json(
        { message: data.message || "Subscription failed" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

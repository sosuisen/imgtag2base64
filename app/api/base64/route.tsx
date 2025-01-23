import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imgtag } = await request.json();

    if (!imgtag) {
      return NextResponse.json(
        { error: 'imgtag is required' },
        { status: 400 }
      );
    }

    const match = imgtag.match(/<img[^>]+src="([^">]+)"/);
    if (!match) {
      return NextResponse.json(
        { error: 'No valid image URL found' },
        { status: 400 }
      );
    }

    const imageUrl = match[1];

    console.log(imageUrl);

    const response = await fetch(imageUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch image' },
        { status: 500 }
      );
    }

    const imageBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString('base64');

    return NextResponse.json({ base64 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to process the request' },
      { status: 500 }
    );
  }
} 
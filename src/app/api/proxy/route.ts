import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {

    const apiResponse = await fetch('https://api-menu.gameshell.ru/api_mobile/v1/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        project: process.env.NEXT_PUBLIC_API_PROJECT_KEY ?? '',
        desk: process.env.NEXT_PUBLIC_API_DESC_KEY ?? '',
        client: process.env.NEXT_PUBLIC_API_CLIENT_KEY ?? '',
      },
    });

    if (!apiResponse.ok) {
      return NextResponse.json(
        { error: `Ошибка API: ${apiResponse.statusText}` },
        { status: apiResponse.status }
      );
    }

    const apiData = await apiResponse.json();
    return NextResponse.json(apiData);


  } catch (error) {
    console.error('Ошибка прокси:', error);
    return NextResponse.json(
      { error: 'Ошибка прокси-сервера' },
      { status: 500 }
    );
  }
}

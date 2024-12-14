import { NextRequest, NextResponse } from 'next/server';

// route-handler
export async function POST(req: NextRequest) {
  try {
    // Получаем данные из body запроса
    const { path, method, body } = await req.json();

    const apiResponse = await fetch(`https://api-menu.gameshell.ru/api_mobile/v1${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        project: process.env.NEXT_PUBLIC_API_PROJECT_KEY ?? '',
        desk: process.env.NEXT_PUBLIC_API_DESC_KEY ?? '',
        client: process.env.NEXT_PUBLIC_API_CLIENT_KEY ?? '',
      },
      body: JSON.stringify(body),
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

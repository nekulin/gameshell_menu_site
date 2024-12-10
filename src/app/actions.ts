'use server';

export const getAllProducts = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:5000';
    const proxyUrl = `${baseUrl}/api/proxy`;

    const response = await fetch(proxyUrl, {
      method: 'POST',
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`Ошибка прокси: ${response.statusText}`);
    }

    const result = await response.json();
    return result;

  } catch (error: any) {
    console.error('Ошибка Server Action:', error);
    return { error: 'Не удалось загрузить продукты.' };
  }
};

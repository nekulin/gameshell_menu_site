'use server';

// Zod
import { AllProductsShema, MoovingCartSchema, GetCartSchema } from "@/types/zod-schemas";


export const getAllProducts = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:5000';
    const proxyUrl = `${baseUrl}/api/proxy`;

    const response = await fetch(proxyUrl, {
      method: 'POST',
      body: JSON.stringify({
        path: '/menu',
        method: 'POST',
        body: {}, 
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка прокси: ${response.statusText}`);
    }

    const result = await response.json();

    // const validatedResult = AllProductsShema.safeParse(result);
    // if(validatedResult.error){
    //   console.log('validatedResult ERROR', validatedResult.error)
    //   return;
    // }

    return result;

  } catch (error: any) {
    console.error('Ошибка Server Action:', error);
    return { error: 'Не удалось загрузить продукты.' };
  }
};



export const getCart = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:5000';
    const proxyUrl = `${baseUrl}/api/proxy`;

    const response = await fetch(proxyUrl, {
      method: 'POST',
      body: JSON.stringify({
        path: '/basket/dashboard',
        method: 'POST',
        body: {}, 
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка прокси: ${response.statusText}`);
    }


    const result = await response.json();
    // const validatedResult = GetCartSchema.safeParse(result);
    // if(validatedResult.error){
    //   console.log('validatedResult ERROR', validatedResult.error)
    //   return;
    // }

    return result;

  } catch (error: any) {
    console.error('Ошибка Server Action:', error);
    return { error: 'Не удалось загрузить продукты.' };
  }
};



export const addToCart = async (productId: number, count: number) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:5000';
    const proxyUrl = `${baseUrl}/api/proxy`;

    const response = await fetch(proxyUrl, {
      method: 'POST',
      body: JSON.stringify({
        path: '/order/add',
        method: 'POST',
        body: {
          id: productId,
          count
        }, 
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка прокси: ${response.statusText}`);
    }

    const result = await response.json();

    // const validatedResult = MoovingCartSchema.safeParse(result);
    // if(validatedResult.error){
    //   console.log('validatedResult ERROR', validatedResult.error)
    //   return;
    // }

    return result;

  } catch (error: any) {
    console.error('Ошибка Server Action:', error);
    return { error: 'Не удалось загрузить продукты.' };
  }
};


export const deleteFromCart = async (productId: number, count: number) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:5000';
    const proxyUrl = `${baseUrl}/api/proxy`;

    const response = await fetch(proxyUrl, {
      method: 'POST',
      body: JSON.stringify({
        path: '/order/delete',
        method: 'POST',
        body: {
          id: productId,
          count
        }, 
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка прокси: ${response.statusText}`);
    }


    const result = await response.json();

    // const validatedResult = MoovingCartSchema.safeParse(result);
    // if(validatedResult.error){
    //   console.log('validatedResult ERROR', validatedResult.error)
    //   return;
    // }

    return result;

  } catch (error: any) {
    console.error('Ошибка Server Action:', error);
    return { error: 'Не удалось загрузить продукты.' };
  }
};

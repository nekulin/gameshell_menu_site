import { z } from 'zod'

export const AllProductsShema = z.object({
    success: z.string(),
    desk: z.object({
        name: z.string(),
    }),
    categories: z.array(z.object({
        id: z.number(),
        parent_id: z.number(),
        name: z.string()
    })),
    products: z.array(z.object({
        menu_category_id: z.number(),
        menu_root_category_id: z.number(),
        id: z.number(),
        sort: z.number(),
        name: z.string(),
        desc: z.string(),
        weight: z.number(),
        weight_unit: z.string(),
        price: z.number(),
        price_value: z.string(),
        empoloyee_zone: z.string(),
    })),
})
export type TProduct = z.infer<typeof AllProductsShema> 


export const GetCartSchema = z.object({
    success: z.string(),
    basket: z.object({
        total: z.union([z.string(), z.null()]),
    }),
    orders: z.array(z.object({
        id: z.number(),
        count: z.number(),
        amount: z.string(),
    })),
    client: z.object({
        is_allowed_bonus: z.boolean(),
        bonus: z.string(),
    })
})
export type TAddToCart = z.infer<typeof GetCartSchema>


export const MoovingCartSchema = z.object({
    success: z.string(),
    count: z.number(),
    basket: z.object({
        total: z.union([z.string(), z.null()]),
    }),
})
export type TMoovingCart = z.infer<typeof MoovingCartSchema>
interface ICategory {
    id: number,
    parent_id: number,
    name: string
}

interface IProduct {
    id: number,
    name: string,
    desc: string,
    weight: number,
    weight_unit: string,
    price: number,
    price_value: string,
    menu_category_id: number,
    menu_root_category_id: number,
}


// 1) Функция возвращает объект, в котором ключи - это id родительских категорий, а значения - массивы подкатегорий

// В функцию передаём:
// [
//     { "id": 51, "parent_id": null, "name": "Бар" },
//     { "id": 181, "parent_id": 51, "name": "Алкогольные напитки" },
//     { "id": 182, "parent_id": 181, "name": "Пиво" }
// ]

// Преобразование в:
// {
//     51: [{ "id": 181, "parent_id": 51, "name": "Алкогольные напитки" }],
//     181: [{ "id": 182, "parent_id": 181, "name": "Пиво" }]
// }
const buildCategoryMap = (categories: ICategory[]) => {

    const categoryMap: Record<number, ICategory[]> = {};
  
    categories.forEach((category) => {
        if (!categoryMap[category.parent_id]) {
            categoryMap[category.parent_id] = [];
        }
            categoryMap[category.parent_id].push(category);
    });
  
    return categoryMap;
};

  
// 2) Функция получает categoryMap и rootCategoryId, возвращает массив id всех подкатегорий, относящихся к этому rootCategoryId 
// [181, 182]
const getAllSubcategories = (rootCategoryId: number, categoryMap: Record<number, ICategory[]>) => {
    const subcategories: number[] = [];
  
    const recurse = (parentId: number) => {
        if (categoryMap[parentId]) {
            categoryMap[parentId].forEach((category) => {
                subcategories.push(category.id);
                recurse(category.id);
            });
        } else return
    };
  
    recurse(rootCategoryId);
    return subcategories;
};

  
const getProductsByRootCategory = (rootCategoryId: number, categories: ICategory[], products: IProduct[]) => {
    const categoryMap = buildCategoryMap(categories);
    const allCategoryIds = getAllSubcategories(rootCategoryId, categoryMap);
    allCategoryIds.push(rootCategoryId); // Добавляем в [181, 182] id и самой root-категории   =>   [181, 182, 51]

    // И по итогу - для каждой root-категории мы получаем ТОВАРЫ из ВСЕХ уровней вложенности 
    return products.filter((product) => allCategoryIds.includes(product.menu_category_id));
};

export default getProductsByRootCategory;
  
// чтобы прокручивался только блок "products__main", а не вся страница
function handleTabClick(categoryId: number) {
    const target = document.getElementById(`category-${categoryId}`);
    const productsMain = document.querySelector('.products-main');

    if (target && productsMain) {
        const targetPosition = target.offsetTop - productsMain.getBoundingClientRect().top;
        productsMain.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
}

export default handleTabClick;
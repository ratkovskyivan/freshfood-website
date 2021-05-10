export function getTemplateCategory(category = 'all', delay = 0) {
    return category !== 'all' ? 
    `<div class="zoom _animate-items delay-${delay+1}"><button class="food-menu__box" data-category="${category}">${category}</button></div>` :
    '<div class="zoom _animate-items"><button class="food-menu__box active">all</button></div>'
}

export function getTemplateProduct(product) {
	return ` 
		<div class="food-menu__product bottom-up _animate-items" style="animation: visible .5s ease-in-out">
            <div class="food-menu__image" style="background-image: url(${product.image});"></div>
            <div class="food-menu__data">
	            <div class="food-menu__text">
		            <h4>${product.name}</h4>
	                <span>${product.price}$</span>
            	</div>
	            <button class="food-menu__cart" data-id=${product.id}>
	               <i class='bx bx-shopping-bag'></i>
	            </button>
            </div>
        </div>
	`
}

export function getTemplateCart(item) {
	const cartItem = document.createElement('div')
	cartItem.classList.add('cart__product')
	cartItem.innerHTML = ` 
		<div class="cart__box">
            <div class="cart__box-image" style="background-image: url(${item.image});"></div>
        </div>
        <div class="cart__counter">
	        <div class="cart__counter-up" data-id=${item.id}>
	            <i class='bx bxs-chevron-up'></i>
	        </div>
            <p class="cart__counter-count">${item.amount}</p>
            <div class="cart__counter-down" data-id=${item.id}>
                <i class='bx bxs-chevron-down'></i>
            </div>
        </div>
        <div class="cart__data">
            <h3 class="cart__data-name">${item.name}</h3>
            <p class="cart__data-price">${item.price}$</p>
        </div>
       	<div class="cart__remove" data-id=${item.id}>
            <i class='bx bx-x'></i>
        </div>
	`
	return cartItem
}

export function getTemplateNoProducts() {
	const p = document.createElement('p')
	p.classList.add('no-products')
	p.textContent = 'No products!'
	p.style.animation = 'visible .3s ease-in-out'
	return p
}
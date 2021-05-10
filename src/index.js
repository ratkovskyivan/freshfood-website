// Modules
import {Products} from './js/products'
import {Cart} from './js/cart'
import {animationLoop} from './js/animate'
import './styles/index.scss'

// Events
document.addEventListener('DOMContentLoaded', () => {
    const products = new Products()
    const cart = new Cart()

    products.getProducts()
        .then(products.getCategories)
        .then(data => {
            products.displayProducts(data.products)
            products.displayCategories(data.categories)
            cart.changeCategory(data.products, products.displayProducts)
            cart.toCart(data.products)
        })
        .then(() => {
            animationLoop()
        })
})
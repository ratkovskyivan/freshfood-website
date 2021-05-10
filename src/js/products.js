// Modules
import {getTemplateCategory, getTemplateProduct} from './templates'

// Variables
const foodMenu = document.getElementById('food-menu')
const categoriesContainer = foodMenu.querySelector('.food-menu__categories')
const productsContainer = foodMenu.querySelector('.food-menu__container')

// Class Products
export class Products {

    async getProducts() {
        const res = await fetch('data.json')
        const data = await res.json()
        return data.items.map(item => {
            const {id, name, category, price} = item
            const image = item.image.url
            return {id, name, category, price, image}
        })
    }

    getCategories(products) {
        const categories = products
        .map(product => product.category)
        .filter((category, i, arr) => arr.indexOf(category) === i)
        .sort()

        return {products, categories}
    }

    displayCategories(categories) {
        let categoriesHTML = getTemplateCategory()
        categories.map((category, i) => categoriesHTML += getTemplateCategory(category, i))
        categoriesContainer.innerHTML = categoriesHTML
    }

    displayProducts(products, category = null) {
        let productsHTML = ''
        products
        .filter(product => category === null || product.category === category)
        .map(product => productsHTML += getTemplateProduct(product))
        
        productsContainer.innerHTML = productsHTML
    }
}
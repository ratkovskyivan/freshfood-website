// Modules
import {Storage} from './storage'
import {getTemplateCart, getTemplateNoProducts} from './templates'

// Variables
const overlay = document.querySelector('.overlay')
const foodMenu = document.getElementById('food-menu')

const cartDOM = document.getElementById('cart')
const cartCloseBtn = cartDOM.querySelector('.cart__close')
const cartContainer = cartDOM.querySelector('.cart__container')
const cartTotal = cartDOM.querySelector('.cart__total-count')
const cartClearBtn = cartDOM.querySelector('.cart__clear-btn')

const navCart = document.querySelector('.nav__cart')
const navCartBtn = navCart.querySelector('.nav__cart-icon')
const navCartCount = navCart.querySelector('.nav__cart-count')

// Class Cart
export class Cart {
    #cart = []

    constructor() {
        this.#setup()
    }

    #setup() {
        this.#cart = Storage.getCart()
        this.#displayCart()
        this.#cartLogic()
        this.clearCart = this.clearCart.bind(this)

        navCartBtn.addEventListener('click', this.#openCart)
        cartCloseBtn.addEventListener('click', this.#closeCart)
        cartClearBtn.addEventListener('click', this.clearCart)
    }

    #displayEmptyCart() {
        cartContainer.appendChild(getTemplateNoProducts())
    }

    #displayCart() {
        this.#cart.length > 0 ? (
            this.#cart.map(item => this.#addItem(item)),
            this.#setCartValues(this.#cart)
        ) : this.#displayEmptyCart()
    }

    #openCart() {
        overlay.classList.add('visible')
        cartDOM.classList.add('open')
    }

    #closeCart() {
        overlay.classList.remove('visible')
        cartDOM.classList.remove('open')
    }

    clearCart() {
        if (this.#cart.length > 0) {
            const cartItemsId = this.#cart.map(item => item.id)
            cartItemsId.forEach(id => this.#removeItem(id))

            while (cartContainer.children.length > 0) {
                cartContainer.removeChild(cartContainer.children[0])
            }

            this.#closeCart()
        }
    }

    #setCartValues(cart) {
        let tempTotal = 0
        let itemsCount = 0

        cart.map(item => {
            tempTotal += item.amount * item.price
            itemsCount += item.amount
        })

        cartTotal.textContent = parseFloat(tempTotal)
        navCartCount.textContent = itemsCount
    }

    #addItem(item) {
        const firstChild = cartContainer.children[0]
        if (firstChild && firstChild.classList.contains('no-products')) {
            cartContainer.removeChild(firstChild)
        }
        cartContainer.appendChild(getTemplateCart(item))
    }

    #removeItem(id) {
        Array.from(foodMenu.querySelectorAll('.food-menu__cart')).map(item => {
            if (item.dataset.id === id) {
                item.classList.remove('active')
                item.disabled = false
            }
        })

        this.#cart = this.#cart.filter(item => item.id !== id)
        this.#setCartValues(this.#cart)
        Storage.saveCart(this.#cart)

        if (this.#cart.length === 0) {
            setTimeout(() => this.#displayEmptyCart(), 300)
        }
    }

    #updateItem(item, id, action) {
        const tempItem = this.#cart.find(item => item.id === id)
        if (action === 'increment') {
            tempItem.amount++
            item.nextElementSibling.textContent = tempItem.amount
        } else if (action === 'decrement') {
            if (tempItem.amount > 1) {
                tempItem.amount--
                item.previousElementSibling.textContent = tempItem.amount
            }
        }

        this.#setCartValues(this.#cart)
        Storage.saveCart(this.#cart)
    }

    #cartLogic() {
        cartContainer.addEventListener('click', e => {
            const currItem = e.target.parentNode
            const id = currItem.dataset.id
            
            if (currItem.classList.contains('cart__remove')) {
                currItem.parentNode.style.animation = 'hidden .5s ease-in-out'
                setTimeout(() => cartContainer.removeChild(currItem.parentNode), 200)
                this.#removeItem(id)
            } else if (currItem.classList.contains('cart__counter-up')) {
                this.#updateItem(currItem, id, 'increment')
            } else if (currItem.classList.contains('cart__counter-down')) {
                this.#updateItem(currItem, id, 'decrement')
            }
        })
    }

    toCart(products) {
        foodMenu.querySelectorAll('.food-menu__cart').forEach(btn => {
            const id = btn.dataset.id
            const inCart = this.#cart.find(item => item.id === id)
            if (inCart) {
                btn.classList.add('active')
                btn.disabled = true
            }

            btn.addEventListener('click', e => {
                const currBtn = e.target.parentNode
                currBtn.classList.add('active')
                currBtn.disabled = true

                const productItem = products.find(product => product.id === id)
                const cartItem = {...productItem, amount: 1}

                this.#cart = [...this.#cart, cartItem]
                this.#addItem(cartItem)
                this.#setCartValues(this.#cart)
                this.#openCart()
                Storage.saveCart(this.#cart)
            })
        })
    }

    changeCategory(products, display) {
        foodMenu.querySelectorAll('.food-menu__box').forEach(btn => {
            btn.addEventListener('click', e => {
                foodMenu.querySelector('.food-menu__box.active').classList.remove('active')
                e.target.classList.add('active')
                const {category} = e.target.dataset
                display(products, category)
                this.toCart(products)
            })
        })
    }
}
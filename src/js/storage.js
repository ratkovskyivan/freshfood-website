export class Storage {
    static getCart() {
        const cart = localStorage.getItem('cart')
        return cart ? JSON.parse(cart) : []
    }

    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}
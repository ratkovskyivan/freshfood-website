// Variables
const btnTop = document.querySelector('.btn-top')

const mobNav = document.querySelector('.mob-nav')
const mobNavBox = mobNav.querySelector('.mob-nav__move-box')
const mobNavLinks = mobNav.querySelectorAll('.mob-nav__link')

const nav = document.querySelector('.nav')
const navLinks = nav.querySelectorAll('.nav__link')
const navCartBtn = nav.querySelector('.nav__cart-icon')

// Actions
function mobActiveLink(e) {
    const currLink = e.target.parentNode
    const {left} = currLink.parentNode.getBoundingClientRect()

    mobNavBox.style.left = `${left}px`

    mobNavLinks.forEach(link => link.classList.remove('active'))
    currLink.classList.add('active')
}

function activeLink(e) {
    navLinks.forEach(link => link.classList.remove('active'))
    e.target.classList.add('active')
}

function btnTopActive() {
    const {scrollTop} = document.documentElement
    const offsetTop = 300
    pageYOffset > offsetTop || scrollTop > offsetTop ?
    btnTop.classList.add('active') : btnTop.classList.remove('active')
}

// Events
document.addEventListener('scroll', btnTopActive)

mobNavLinks.forEach(link => link.addEventListener('click', mobActiveLink))
navLinks.forEach(link => link.addEventListener('click', activeLink))
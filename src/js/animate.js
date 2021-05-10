const scroll = requestAnimationFrame || function(cb) {setTimeout(cb, 1000/60)}

function isElInViewPort(el) {
    const {top, bottom} = el.getBoundingClientRect()
    const clientHeight = document.documentElement.clientHeight

    return (
        (top <= 0 && bottom >= 0) ||
        (bottom >= (innerHeight || clientHeight) && top <= (innerHeight || clientHeight)) ||
        (top >= 0 && bottom <= (innerHeight || clientHeight))
    )
}

export function animationLoop() {
    const elToAnimate = document.querySelectorAll('._animate-items')

    elToAnimate.forEach(item => {
        isElInViewPort(item) ? item.classList.add('_active') : item.classList.remove('_active')
    })

    scroll(animationLoop)
}
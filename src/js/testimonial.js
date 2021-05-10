const testimonialCards = document.querySelectorAll('.testimonial__card')

function activeCard(e) {
    testimonialCards.forEach(card => card.classList.remove('active'))
    e.target.classList.add('active')
}

testimonialCards.forEach(card => card.addEventListener('click', activeCard))
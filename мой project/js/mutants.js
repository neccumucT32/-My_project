const cards = document.querySelectorAll(".card");

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

function showCardsOnScroll() {
  cards.forEach((card, index) => {
    if (isInViewport(card)) {
      card.classList.add("visible");

      if (index % 2 === 0) {
        card.classList.add("left");
      } else {
        card.classList.add("right");
      }
    }
  });
}

window.addEventListener("scroll", showCardsOnScroll);

showCardsOnScroll();

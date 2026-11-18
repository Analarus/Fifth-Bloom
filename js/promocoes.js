
const promotionCards = document.querySelectorAll(".promotion-card");

const categoryFilters = document.querySelectorAll(".category-filter");
const discountFilters = document.querySelectorAll(".discount-filter");
const ratingFilters = document.querySelectorAll(".rating-filter");

const promotionSort = document.getElementById("promotion-sort");
const promotionCount = document.getElementById("promotion-count");

const clearFilters = document.getElementById("clear-promotion-filters");
const promotionsGrid = document.getElementById("promotions-grid");
const noPromotions = document.getElementById("no-promotions");

function filterPromotions() {

    const categories = [...categoryFilters]
        .filter(filter => filter.checked)
        .map(filter => filter.value);

    const discounts = [...discountFilters]
        .filter(filter => filter.checked)
        .map(filter => Number(filter.value));

    const ratings = [...ratingFilters]
        .filter(filter => filter.checked)
        .map(filter => Number(filter.value));

    let visibleCount = 0;

    promotionCards.forEach(card => {

        const category = card.dataset.category;
        const discount = Number(card.dataset.discount);
        const rating = Number(card.dataset.rating);

        const categoryMatch =
            categories.length === 0 || categories.includes(category);

        const discountMatch =
            discounts.length === 0 ||
            discounts.some(value => discount >= value);

        const ratingMatch =
            ratings.length === 0 ||
            ratings.some(value => rating >= value);

        const show =
            categoryMatch && discountMatch && ratingMatch;

        card.hidden = !show;

        if (show) visibleCount++;

    });

    promotionCount.textContent =
        `${visibleCount} ${visibleCount === 1 ? "produto" : "produtos"}`;

    noPromotions.hidden = visibleCount !== 0;

}

function sortPromotions() {

    const cards = [...promotionCards];

    const order = promotionSort.value;

    cards.sort((a, b) => {

        const priceA = Number(a.dataset.price);
        const priceB = Number(b.dataset.price);

        const discountA = Number(a.dataset.discount);
        const discountB = Number(b.dataset.discount);

        if (order === "menor") return priceA - priceB;

        if (order === "maior") return priceB - priceA;

        if (order === "desconto") return discountB - discountA;

        return 0;

    });

    cards.forEach(card => promotionsGrid.appendChild(card));

}

categoryFilters.forEach(filter => {
    filter.addEventListener("change", filterPromotions);
});

discountFilters.forEach(filter => {
    filter.addEventListener("change", filterPromotions);
});

ratingFilters.forEach(filter => {
    filter.addEventListener("change", filterPromotions);
});

promotionSort.addEventListener("change", sortPromotions);

clearFilters.addEventListener("click", () => {

    document.querySelectorAll(
        ".category-filter, .discount-filter, .rating-filter"
    ).forEach(filter => filter.checked = false);

    filterPromotions();

});

filterPromotions();

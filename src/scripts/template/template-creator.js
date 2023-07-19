import CONFIG from "../globals/config";

const createHomeTemplate = (resto) => `
<div class="resto_item" tabindex="0">
  <div class="content1">
    <span class="city">Kota : ${resto.city}</span>
    <span class="rating">Rating : ${resto.rating || '-'}</span>
  </div>
  <img class="lazyload thumb" data-src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" alt="${resto.name || '-'}">
  <div class="content2">
    <h1 class="resto__name">${resto.name || '-'}</h1>
    <p class="desc">${resto.description || '-'}</p>
    <button class="btn resto__title" onclick="window.location.href='./#/detail/${resto.id}'">Lihat Detail</button>
  </div>
</div>
`;

const createDetailTemplate = (detail) => `
<div class="detail_item">
  <div class="content3">
    <h1><span class="resto__name">${detail.name}<span></h1>
    <img class="lazyload thumbs" data-src="${CONFIG.BASE_IMAGE_URL + detail.pictureId}" alt="${detail.name}">
    <p><span class="snameall">${detail.address}, Kota ${detail.city}<span></p>
  </div>
  <div class="content4">
    <span>Deskripsi:</span> 
    <p>${detail.description}</p>
    <span>Menu Makanan:</span>
    <p>${detail.menus.foods.map((food) => food.name).join(', ')}</p>
    <span>Menu Minuman:</span>
    <p>${detail.menus.drinks.map((drink) => drink.name).join(', ')}</P>
  </div>
  <h1>Reviews</h1>
  <div class="content5">
    ${detail.customerReviews.map((review) => `
      <div class="reviews">
        <p class="rdate">${review.date}</p>
        <p class="rname">${review.name}</p>
        <p class="rreview">${review.review}</p>
      </div>
    `).join('')}
  </div>
</div>
`;

const createLikeRestoButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;
 
const createUnlikeRestoButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {createHomeTemplate, createDetailTemplate, createLikeRestoButtonTemplate, createUnlikeRestoButtonTemplate};
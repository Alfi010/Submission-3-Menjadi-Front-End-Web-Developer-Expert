import UrlParser from "../routes/url-parser";
import DataSource from "../data/data-source";
import { createDetailTemplate } from "../template/template-creator";
import "../component/resto-detail";
import "../component/resto-like";
import LikeButtonPresenter from "../utils/like-button-presenter";
import FavoriteRestoIdb from "../data/favorite-idb";

const Detail = {
  async render() {
    return `
        <resto-detail></resto-detail>
        <resto-like></resto-like>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detail = await DataSource.detail(url.id);
    const detailContainer = document.querySelector('#detail');
    detailContainer.innerHTML = createDetailTemplate(detail);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteResto: FavoriteRestoIdb,
      resto: {
        id: detail.id,
        name: detail.name,
        city: detail.city,
        description: detail.description,
        pictureId: detail.pictureId,
        rating: detail.rating,
      },
    });
  },
};

export default Detail;
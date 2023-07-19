import FavoriteRestoIdb from "../data/favorite-idb";
import FavoriteRestoSearchView from "../views/pages/liked-resto/favorite-resto-search-view";
import FavoriteRestoShowPresenter from "../views/pages/liked-resto/favorite-resto-show-presenter";
import FavoriteRestoSearchPresenter from "../views/pages/liked-resto/favorite-resto-search-presenter";

const view = new FavoriteRestoSearchView();

const Favorite = {
  async render() {
      return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestoShowPresenter({view, favoriteResto: FavoriteRestoIdb});
    new FavoriteRestoSearchPresenter({view, favoriteResto: FavoriteRestoIdb});
  },
};

export default Favorite;
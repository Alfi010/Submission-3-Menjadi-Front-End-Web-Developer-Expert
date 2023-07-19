import FavoriteRestoIdb from '../../src/scripts/data/favorite-idb';
import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
 
const createLikeButtonPresenterWithRestaurant = async (resto) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteResto: FavoriteRestoIdb,
    resto,
  });
};
 
export { createLikeButtonPresenterWithRestaurant };
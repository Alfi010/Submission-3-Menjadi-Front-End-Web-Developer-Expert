import { itActsAsFavoriteRestaurantModel } from "./contract/favoriteRestoContract";
import FavoriteRestoIdb from "../src/scripts/data/favorite-idb";
 
describe('Favorite Resto Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestoIdb.getAllResto()).forEach(async (resto) => {
      await FavoriteRestoIdb.deleteResto(resto.id);
    });
  });
 
  itActsAsFavoriteRestaurantModel(FavoriteRestoIdb);
});
import { itActsAsFavoriteRestaurantModel } from "./contract/favoriteRestoContract";
 
let favoriteResto = [];
 
const FavoriteRestoArray = {
  getResto(id) {
    if (!id) {
      return;
    }
 
    return favoriteResto.find((resto) => resto.id == id);
  },
 
  getAllResto() {
    return favoriteResto;
  },
 
  putResto(resto) {
    if (!resto.hasOwnProperty('id')) {
      return;
    }
 
    // pastikan id ini belum ada dalam daftar favoriteResto
    if (this.getResto(resto.id)) {
      return;
    }
 
    favoriteResto.push(resto);
  },
 
  deleteResto(id) {
    // cara boros menghapus restaurant dengan meng-copy restaurant yang ada
    // kecuali restaurant dengan id == id
    favoriteResto = favoriteResto.filter((resto) => resto.id != id);
  },
  
  searchResto(query) {
    return this.getAllResto()
      .filter((resto) => {
        const loweredCaseRestoTitle = (resto.title || '-').toLowerCase();
        const jammedRestoTitle = loweredCaseRestoTitle.replace(/\s/g, '');
        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');
        return jammedRestoTitle.indexOf(jammedQuery) != -1;
      });
  },
};
 
describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => favoriteResto = []);
 
  itActsAsFavoriteRestaurantModel(FavoriteRestoArray);
});
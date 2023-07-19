import FavoriteRestoSearchPresenter from "../src/scripts/views/pages/liked-resto/favorite-resto-search-presenter";
import FavoriteRestoIdb from '../src/scripts/data/favorite-idb';
import FavoriteRestoSearchView from "../src/scripts/views/pages/liked-resto/favorite-resto-search-view";

describe('Searching restaurants', () => {
  let presenter;
  let favoriteResto;
  let view;

  const searchResto = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestoSearchContainer = () => {
    view = new FavoriteRestoSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteResto = spyOnAllFunctions(FavoriteRestoIdb);
    presenter = new FavoriteRestoSearchPresenter({
      favoriteResto,
      view,
    });
  };

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    setRestoSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchResto('restaurant a');

      expect(presenter.latestQuery)
        .toEqual('restaurant a');
    });

    it('should ask the model to search for liked restaurants', () => {
      searchResto('restaurant a');

      expect(favoriteResto.searchResto)
        .toHaveBeenCalledWith('restaurant a');
    });

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restos')
        .addEventListener('restos:updated', () => {
          expect(document.querySelectorAll('.resto_item').length).toEqual(3);
          done();
        });

      favoriteResto.searchResto.withArgs('restaurant a').and.returnValues([
        { id: 111, name: 'restaurant abc' },
        { id: 222, name: 'ada juga restaurant abcde' },
        { id: 333, name: 'ini juga boleh restaurant a' },
      ]);

      searchResto('restaurant a');

      setTimeout(()=>{
        done();
      }, 3000);
    });

    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restos')
        .addEventListener('restos:updated', () => {
          const restoName = document.querySelectorAll('.resto__name');
          expect(restoName.item(0).textContent)
            .toEqual('restaurant abc');
          expect(restoName.item(1).textContent)
            .toEqual('ada juga restaurant abcde');
          expect(restoName.item(2).textContent)
            .toEqual('ini juga boleh restaurant a');

          done();
        });

      favoriteResto.searchResto.withArgs('restaurant a')
        .and
        .returnValues([
          {
            id: 111,
            name: 'restaurant abc',
          },
          {
            id: 222,
            name: 'ada juga restaurant abcde',
          },
          {
            id: 333,
            name: 'ini juga boleh restaurant a',
          },
        ]);

      searchResto('restaurant a');

      setTimeout(()=>{
        done();
      }, 3000);
    });

    describe('When query is empty', () => {
      it('should capture the query as empty', () => {
        searchResto(' ');

        expect(presenter.latestQuery.length).toEqual(0);

        searchResto('    ');
        expect(presenter.latestQuery.length).toEqual(0);

        searchResto('');
        expect(presenter.latestQuery.length).toEqual(0);

        searchResto('\t');
        expect(presenter.latestQuery.length).toEqual(0);
      });

      it('should show all favorite restaurants', () => {
        searchResto('    ');
        expect(favoriteResto.getAllResto)
          .toHaveBeenCalled();
      });
    });
    describe('When no favorite restaurants could be found', () => {
      it('should show the empty message', (done) => {
        document.getElementById('restos')
          .addEventListener('restos:updated', () => {
            expect(document.querySelectorAll('.resto-not-found').length).toEqual(1);
            done();
          });

        favoriteResto.searchResto.withArgs('restaurant a').and.returnValues([]);

        searchResto('restaurant a');

        setTimeout(()=>{
          done();
        }, 3000);
      });

      it('should not show any restaurant', (done) => {
        document.getElementById('restos').addEventListener('restos:updated', () => {
          expect(document.querySelectorAll('.resto_item').length).toEqual(0);
          done();
        });

        favoriteResto.searchResto.withArgs('restaurant a').and.returnValues([]);

        searchResto('restaurant a');

        setTimeout(()=>{
          done();
        }, 3000);
      });

      it('should show - when the restaurant returned does not contain a name', (done) => {
        document.getElementById('restos').addEventListener('restos:updated', () => {
          const restoName = document.querySelectorAll('.resto__name');
          expect(restoName.item(0).textContent).toEqual('-');
       
          done();
        });
       
        favoriteResto.searchResto.withArgs('restaurant a').and.returnValues([
          { id: 444 },
        ]);
       
        searchResto('restaurant a');

        setTimeout(()=>{
          done();
        }, 3000);
      });
    });
  });
});
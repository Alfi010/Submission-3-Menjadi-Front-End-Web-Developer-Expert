class FavoriteRestoSearchPresenter {
    constructor({ favoriteResto, view }) {
        this._view = view;
        this._listenToSearchRequestByUser();
        this._favoriteResto = favoriteResto;
    }

    _listenToSearchRequestByUser() {
        this._view.runWhenUserIsSearching((latestQuery) => {
            this._searchResto(latestQuery);
          });
    }

    async _searchResto(latestQuery) {
        this._latestQuery = latestQuery.trim();

        let foundResto;
        if (this._latestQuery.length > 0) {
            foundResto = await this._favoriteResto.searchResto(this.latestQuery);
        } else {
            foundResto = await this._favoriteResto.getAllResto();
        }

        this._showFoundResto(foundResto);
    }

    _showFoundResto(resto) {
        this._view.showFavoriteResto(resto);
    }

    get latestQuery() {
        return this._latestQuery;
    }
}

export default FavoriteRestoSearchPresenter;
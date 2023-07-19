import { createHomeTemplate } from "../../../template/template-creator";

class FavoriteRestoSearchView {
  getTemplate() {
    return `
        <h1 class="favorite-title">FAVORITE WARTEG!</h1>
          <input id="query" type="text">
            <article class="restos" id="restos"></article>
      `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteResto(resto = []) {
    if (!resto) return;
    let html;
    if (resto.length) {
      html = resto.reduce((carry, resto) => carry.concat(createHomeTemplate(resto)), '');
    } else {
      html = this._getEmptyRestoTemplate();
    }

    document.getElementById('restos').innerHTML = html;

    document.getElementById('restos').dispatchEvent(new Event('restos:updated'));
  }
  _getEmptyRestoTemplate() {
    return '<div class="resto-not-found" tabindex="0"><h2>Tidak ada Restaurant yang dapat ditampilkan!</h2><img class="lazyload" data-src="./images/favorite/favorite-image.jpg" alt="Tidak ada Restaurant yang dapat ditampilkan!"</div>';
  }
}

export default FavoriteRestoSearchView;
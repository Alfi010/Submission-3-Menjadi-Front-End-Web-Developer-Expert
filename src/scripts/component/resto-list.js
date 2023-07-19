class RestoList extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
        <h1 class="title">JELAJAHI WARTEG!</h1>
        <article class="restos" id="resto"></article>
      `;
    }
  }
  
  customElements.define('resto-list', RestoList);
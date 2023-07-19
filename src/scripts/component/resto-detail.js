class RestoDetail extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
      <article class="detail" id="detail"></article>
      `;
    }
  }
  
  customElements.define('resto-detail', RestoDetail);
class RestoLike extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div id="likeButtonContainer"></div>
      `;
    }
}

customElements.define('resto-like', RestoLike);
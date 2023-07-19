class AppMain extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
      <main id="maincontent" tabindex="0"></main>
      `;
    }
  }
  
  customElements.define('app-main', AppMain);
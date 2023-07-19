class AppFooter extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
        <footer>
            <p>Copyright © 2023 - WARTEG ONLINE</p>
        </footer>
      `;
    }
  }
  
  customElements.define('app-footer', AppFooter);
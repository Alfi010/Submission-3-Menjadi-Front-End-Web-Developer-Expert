class AppBar extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
      <a href="#maincontent" class="skip-link">Menuju ke Konten</a>
      <header class="header">
        <button id="menu" href="#" accesskey="m">☰</button>
        <img src="./favicon.png" alt="Logo">
        <h1>WARTEG ONLINE</h1> 
        <nav id="drawer">
          <ul>
            <li><a href="#/home">Home</a></li>
            <li><a href="#/favorite">Favorite</a></li>
            <li><a href="#">About Us</a></li> 
          </ul>
        </nav>
      </header>
      `;
    }
  }
  
  customElements.define('app-bar', AppBar);
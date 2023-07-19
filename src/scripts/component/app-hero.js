class AppHero extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
      <div class="hero">
        <div class="heroinner">
          <h1>WARTEG ONLINE</h1>
          <p>Jelajahi Warung Tegal Terdekat Dalam Satu Tampilan!</p>
        </div>
      </div>
      `;
    }
  }
  
  customElements.define('app-hero', AppHero);

  // <picture>
  //         <source media="(max-width: 800px) srcset="./images/hero-image-medium.jpg">
  //         <source media="(max-width: 480px) srcset="./images/hero-image-small.jpg">
  //         <img src = "./images/hero-image-large.jpg" alt="Hero Image">
  //       </picture>
import DataSource from "../data/data-source";
import { createHomeTemplate } from "../template/template-creator";
import "../component/resto-list";
import "../component/app-hero";

const Home = {
    async render() {
      return `
      <app-hero></app-hero>
      <resto-list></resto-list>
      `;
    },
   
    async afterRender() {
      const resto = await DataSource.home();
      const restoContainer = document.querySelector('#resto');
      resto.forEach((restaurants) => {
        restoContainer.innerHTML += createHomeTemplate(restaurants);
      });
    },
  };
   
  export default Home;
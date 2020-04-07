import {createCardTemplate} from "./components/card.js";
import {createEditCardTemplate} from "./components/edit-card.js";
import {createSiteFilterTemplate} from "./components/filter.js";
import {createLoadButtonTemplate} from "./components/load-button.js";
import {createSiteMenuTemplate} from "./components/menu.js";
import {createSiteSortingElement} from "./components/sorting.js";
import {generateFilters} from "./mock/filter.js";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const filters = generateFilters();

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createSiteFilterTemplate(filters));
render(siteMainElement, createSiteSortingElement());

const siteBoardElement = siteMainElement.querySelector(`.board`);
const siteTaskbarElement = siteMainElement.querySelector(`.board__tasks`);

render(siteTaskbarElement, createEditCardTemplate());

for (let i = 0; i < 3; i++) {
  render(siteTaskbarElement, createCardTemplate());
}

render(siteBoardElement, createLoadButtonTemplate());

import AbstractComponent from "./abstract-component.js";

const createLoadButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadButton extends AbstractComponent {
  getTemplate() {
    return createLoadButtonTemplate();
  }
}

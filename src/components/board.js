import AbstractComponent from "./abstract-component.js";

const createSiteBoardTemplate = () => {
  return (
    `<section class="board container"></section>`
  );
};

export default class Board extends AbstractComponent {
  getTemplate() {
    return createSiteBoardTemplate();
  }
}

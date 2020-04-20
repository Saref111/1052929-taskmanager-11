import {createElement} from "../utils.js";

const createSiteBoardElement = () => {
  return (
    `<section class="board container">
      <div class="board__tasks"></div>
    </section>`
  );
};

export default class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteBoardElement();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}

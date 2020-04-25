import AbstractComponent from "./abstract-component.js";

const createFilterMarkup = (filters, isChecked) => {
  const {name, count} = filters;

  return `<input
            type="radio"
            id="filter__${name}"
            class="filter__input visually-hidden"
            name="filter"
            ${isChecked ? `checked` : ``}/>
          <label for="filter__${name}" class="filter__label"> ${name} <span class="filter__all-count">${count}</span></label>
          `;
};

const createSiteFilterTemplate = (filters) => {
  const filterMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filterMarkup}
    </section>`
  );
};


export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createSiteFilterTemplate(this._filters);
  }
}

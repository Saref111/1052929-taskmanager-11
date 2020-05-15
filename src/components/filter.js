import AbstractComponent from "./abstract-component.js";

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

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
  const filterMarkup = filters.map((it) => createFilterMarkup(it, it.id)).join(`\n`);

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

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}

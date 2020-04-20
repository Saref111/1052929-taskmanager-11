import {createTaskTemplate} from "./components/task.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createSiteFilterTemplate} from "./components/filter.js";
import {createLoadButtonTemplate} from "./components/load-button.js";
import {createSiteMenuTemplate} from "./components/menu.js";
import {createSiteSortingElement} from "./components/sorting.js";
import {generateTasks} from "./mock/task.js";
import {generateFilters} from "./mock/filter.js";
import {render, renderPosition} from "./utils.js";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createSiteFilterTemplate(filters));
render(siteMainElement, createSiteSortingElement());

const siteBoardElement = siteMainElement.querySelector(`.board`);
const siteTaskbarElement = siteMainElement.querySelector(`.board__tasks`);

render(siteTaskbarElement, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount).forEach((task) => render(siteTaskbarElement, createTaskTemplate(task)));

render(siteBoardElement, createLoadButtonTemplate());

const loadMoreButton = siteBoardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(siteTaskbarElement, createTaskTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});

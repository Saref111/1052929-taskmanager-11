import BoardComponent from "./components/board.js";
import MenuComponent, {MenuItem} from "./components/menu.js";
import BoardController from "./controllers/board.js";
import FilterController from "./controllers/filter.js";
import TasksModel from "./models/tasks.js";
import {generateTasks} from "./mock/task.js";
import {render, RenderPosition} from "./utils/render.js";

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const tasks = generateTasks(TASK_COUNT);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const siteMenuComponent = new MenuComponent();

render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
const filterComponent = new FilterController(siteMainElement, tasksModel);
filterComponent.render();

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      boardController.createTask();
      break;
  }
});

import FilterComponent from "./components/filter.js";
import BoardComponent from "./components/board.js";
import MenuComponent from "./components/menu.js";
import BoardController from "./controllers/board.js";
import FilterController from "./controllers/filter.js";
import TasksModel from "./models/tasks.js";
import {generateTasks} from "./mock/task.js";
import {generateFilters} from "./mock/filter.js";
import {render, RenderPosition} from "./utils/render.js";

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

render(siteHeaderElement, new MenuComponent(), RenderPosition.BEFOREEND);
// render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);
const filterComponent = new FilterController(siteMainElement, tasksModel);
filterComponent.render();

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

boardController.render();

import TaskComponent from "./components/task.js";
import TaskEditComponent from "./components/task-edit.js";
import FilterComponent from "./components/filter.js";
import LoadButtonComponent from "./components/load-button.js";
import MenuComponent from "./components/menu.js";
import SortComponent from "./components/sort.js";
import BoardComponent from "./components/board.js";
import TasksComponent from "./components/tasks.js";
import NoTasksComponent from "./components/no-task.js";
import {generateTasks} from "./mock/task.js";
import {generateFilters} from "./mock/filter.js";
import {render, RenderPosition} from "./utils/render.js";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const EscKeydownHandler = (evt) => {
    const isEsc = evt.key === `Escape` || evt.key === `Esc`;

    if (isEsc) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, EscKeydownHandler);
    }
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, EscKeydownHandler);
  });

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    replaceEditToTask();
    document.removeEventListener(`keydown`, EscKeydownHandler);
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasksArr) => {
  const isAllTasksArchived = tasksArr.every((task) => task.isArchive);

  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTasksComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(boardComponent.getElement(), new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new TasksComponent().getElement(), RenderPosition.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasksArr.slice(0, showingTasksCount).forEach((task) => {
    renderTask(taskListElement, task);
  });

  const loadButtonComponent = new LoadButtonComponent();
  render(boardComponent.getElement(), loadButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTaskCount = showingTasksCount;
    showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    tasksArr.slice(prevTaskCount, showingTasksCount).forEach((task) => {
      renderTask(taskListElement, task);
    });

    if (showingTasksCount >= tasksArr.length) {
      loadButtonComponent.getElement().remove();
      loadButtonComponent.removeElement();
    }
  });
};

render(siteHeaderElement, new MenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
renderBoard(boardComponent, tasks);

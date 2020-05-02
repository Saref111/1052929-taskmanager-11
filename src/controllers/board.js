import LoadButtonComponent from "../components/load-button.js";
import SortComponent, {SortType} from "../components/sort.js";
import NoTasksComponent from "../components/no-task.js";
import TasksComponent from "../components/tasks.js";
import TaskController from "./task.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const getSortedTasks = (tasks, sortType, startNumber, endNumber) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(startNumber, endNumber);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadButtonComponent = new LoadButtonComponent();
  }

  render(tasksArr) {
    const containerElement = this._container.getElement();
    const isAllTasksArchived = tasksArr.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(containerElement, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(containerElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(containerElement, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = containerElement.querySelector(`.board__tasks`);

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    tasksArr.slice(0, showingTasksCount).forEach((task) => {
      renderTask(taskListElement, task);
    });

    render(containerElement, this._loadButtonComponent, RenderPosition.BEFOREEND);

    this._loadButtonComponent.setClickHandler(() => {
      const prevTaskCount = showingTasksCount;
      showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

      tasksArr.slice(prevTaskCount, showingTasksCount).forEach((task) => {
        renderTask(taskListElement, task);
      });

      if (showingTasksCount >= tasksArr.length) {
        this._loadButtonComponent.getElement().remove();
        this._loadButtonComponent.removeElement();
      }
    });

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = getSortedTasks(tasksArr, sortType, 0, showingTasksCount);

      taskListElement.innerHTML = ``;

      sortedTasks.forEach((task) => renderTask(taskListElement, task));
      render(containerElement, this._loadButtonComponent, RenderPosition.BEFOREEND);
    });
  }
}


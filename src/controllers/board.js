import LoadButtonComponent from "../components/load-button.js";
import SortComponent, {SortType} from "../components/sort.js";
import NoTasksComponent from "../components/no-task.js";
import TasksComponent from "../components/tasks.js";
import TaskController from "./task.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListElement, task);
  });
};

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

    this._tasks = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadButtonComponent = new LoadButtonComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasksArr) {
    this._tasks = tasksArr;

    const containerElement = this._container.getElement();
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(containerElement, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(containerElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(containerElement, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    renderTasks(taskListElement, this._tasks.slice(0, this._showingTasksCount));
    this._renderLoadButton();
  }

  _renderLoadButton() {
    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    render(this._container.getElement(), this._loadButtonComponent, RenderPosition.BEFOREEND);

    this._loadButtonComponent.setClickHandler(() => {
      const prevTaskCount = this._showingTasksCount;
      this._showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = getSortedTasks(this._tasks, this._sortComponent.getSortType(), prevTaskCount, this._showingTasksCount);

      renderTasks(this._container.getElement(), sortedTasks);

      if (this._showingTasksCount >= this._tasks.length) {
        this._loadButtonComponent.getElement().remove();
        this._loadButtonComponent.removeElement();
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

    const taskListElement = this._tasksComponent.getElement();
    const sortedTasks = getSortedTasks(this._tasks, sortType, 0, this._showingTasksCount);

    taskListElement.innerHTML = ``;

    renderTasks(taskListElement, sortedTasks);
    this._renderLoadMoreButton();
  }
}


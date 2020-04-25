import TaskComponent from "../components/task.js";
import TaskEditComponent from "../components/task-edit.js";
import LoadButtonComponent from "../components/load-button.js";
import SortComponent from "../components/sort.js";
import NoTasksComponent from "../components/no-task.js";
import TasksComponent from "../components/tasks.js";
import {render, RenderPosition, replace} from "../utils/render.js";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const EscKeydownHandler = (evt) => {
    const isEsc = evt.key === `Escape` || evt.key === `Esc`;

    if (isEsc) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, EscKeydownHandler);
    }
  };

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, EscKeydownHandler);
  });

  const taskEditComponent = new TaskEditComponent(task);
  taskEditComponent.setSubmitHandler(() => {
    replaceEditToTask();
    document.removeEventListener(`keydown`, EscKeydownHandler);
  });

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
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
  }
}


import TaskComponent from "../components/task.js";
import TaskEditComponent from "../components/task-edit.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class TaskController {
  constructor(containerElement) {
    this._container = containerElement;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._escKeydownHandler = this._escKeydownHandler(this);
  }

  render(task) {
    this._taskComponent = new TaskComponent(task);
    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._escKeydownHandler);
    });

    this._taskEditComponent = new TaskEditComponent(task);
    this._taskEditComponent.setSubmitHandler(() => {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, EscKeydownHandler);
    });

    render(this._container, this._taskComponent, RenderPosition.BEFOREEND);
  }


  _replaceTaskToEdit = () => {
    document.removeEventListener(`keydown`, this._escKeydownHandler);
    replace(this._taskEditComponent, this._taskComponent);
  };

  _replaceEditToTask = () => {
    replace(this._taskComponent, this._taskEditComponent);
  };

  _escKeydownHandler(evt) {
    const isEsc = evt.key === `Escape` || evt.key === `Esc`;

    if (isEsc) {
      this._replaceEditToTask();
    }
  };
}


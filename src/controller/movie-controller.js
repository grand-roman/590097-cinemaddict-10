import FilmDetails from "../components/film-details";
import {isEscPressed, Position, render, unrender} from "../utils";
import FilmCard from "../components/film-card";


class MovieController {
  constructor(bodyContainer, films, containerCard, count, onDataChange, onChangeView) {
    this._bodyContainer = bodyContainer;
    this._film = films;
    this._count = count;
    this._containerCard = containerCard;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
  }

  openPopup(popup) {
    this._onChangeView();
    render(this._bodyContainer, popup.getElement(), Position.BEFOREEND);
    this._bodyContainer.classList.add(`hide-overflow`);
    const onCloseBtnClick = (evtClose) => {
      evtClose.preventDefault();
      if (evtClose.target.classList.contains(`film-details__close-btn`)) {
        MovieController.closePopup(popup, this._bodyContainer);
        this._bodyContainer.removeEventListener(`keydown`, onEscKeydown);
      }
    };
    popup.getElement().addEventListener(`click`, onCloseBtnClick);
    const onEscKeydown = (evtEsc) => {
      if (isEscPressed(evtEsc.key)) {
        MovieController.closePopup(popup, this._bodyContainer);
        this._bodyContainer.removeEventListener(`keydown`, onEscKeydown);
      }
    };
    this._bodyContainer.addEventListener(`keydown`, onEscKeydown);
    const commentAdd = popup.getElement().querySelector(`.film-details__comment-input`);
    commentAdd.addEventListener(`focus`, function () {
      commentAdd.removeEventListener(`keydown`, onEscKeydown);
    });
    commentAdd.addEventListener(`blur`, function () {
      commentAdd.addEventListener(`keydown`, onEscKeydown);
    });
  }
  static closePopup(popup, bodyContainer) {
    unrender(popup.getElement());
    popup.removeElement();
    bodyContainer.classList.remove(`hide-overflow`);
  }

  setDefaultView(popup) {
    if (this._bodyContainer.contains(popup.getElement())) {
      unrender(popup.getElement());
      popup.removeElement();
    }
  }
  init() {

    const arrFilmSlice = this._film.slice(0, this._count);
    const filmToggle = (evt, popup) => {
      this.setDefaultView(popup);
      const togglers = [`film-card__poster`, `film-card__title`, `film-card__comments`];
      if (togglers.some((cls) => evt.target.classList.contains(cls))) {
        this.openPopup(popup);
      }
    };
    let film = {};
    let popup = {};

    for (let i = 0; i < arrFilmSlice.length; i++) {
      film = new FilmCard(this._film[i]);
      film.onMarkAsWatchedClick = (evt) => {
        evt.preventDefault();
        popup = new FilmDetails(this._film[i]);
        getNewMokData(`watched`, popup, this._film[i]);
      };
      film.onFavoriteClick = (evt) => {
        evt.preventDefault();
        popup = new FilmDetails(this._film[i]);
        getNewMokData(`favorites`, popup, this._film[i]);
      };
      film.onAddToWatchlistClick = (evt) => {
        evt.preventDefault();
        popup = new FilmDetails(this._film[i]);
        getNewMokData(`watchlist`, popup, this._film[i]);
      };
      film.onToggleFilm = (evt) =>{
        popup = new FilmDetails(this._film[i]);
        filmToggle(evt, popup);
      };
      render(this._containerCard, film.getElement(), Position.BEFOREEND);
    }
    const getNewMokData = (nameOfList, popups, oldData) => {
      const formData = new FormData(popups.getElement().querySelector(`.film-details__inner`));
      const switchTrueFalse = (v) => !v;
      const userRatio = formData.getAll(`score`);

      const entry = {
        favorites: Boolean(formData.get(`favorites`)),
        watchlist: Boolean(formData.get(`watchlist`)),
        watched: Boolean(formData.get(`watched`)),
        userRatio: `Your rate ${userRatio}`,
      };
      switch (nameOfList) {
        case `favorites`:
          entry.favorites = switchTrueFalse(entry.favorites);
          break;
        case `watchlist`:
          entry.watchlist = switchTrueFalse(entry.watchlist);
          break;
        case `watched`:
          entry.watched = switchTrueFalse(entry.watched);
          break;
      }
      this._onDataChange(entry, this._containerCard, oldData);
    };
  }
}
export default MovieController;

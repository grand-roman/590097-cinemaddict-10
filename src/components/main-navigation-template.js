/**
 * Return template for main-navigation.
 * @return {string}
 */
const getMainNavigationTemplate = () => {
  return (`
    <a href="#all"
      class="main-navigation__item">
      All movies
    </a>
    <a href="#watchlist"
      class="main-navigation__item">
      Watchlist 
      <span class="main-navigation__item-count">13</span>
    </a>
    <a href="#history"
      class="main-navigation__item">
      History 
      <span class="main-navigation__item-count">4</span>
    </a>
    <a href="#favorites"
      class="main-navigation__item">
      Favorites
      <span class="main-navigation__item-count">8</span>
    </a>
    <a href="#stats"
      class="main-navigation__item
        main-navigation__item--additional
        main-navigation__item--active">
      Stats
    </a>
`);
};

export {
  getMainNavigationTemplate
};
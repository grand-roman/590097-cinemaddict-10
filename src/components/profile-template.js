/**
 * Return template for profile.
 * @return {string}
 */
const getProfileTemplate = () => {
  return (`
    <p class="profile__rating">
      Movie Buff
    </p>
    <img class="profile__avatar"
      src="images/bitmap@2x.png"
      alt="Avatar"
      width="35"
      height="35"
    >`);
};

export {
  getProfileTemplate
};

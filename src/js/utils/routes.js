export const HOME = '/';

export const SIGN_IN = '/signin';

export const BOOKS = '/books';

export const NEW_BOOK = '/books/new';

const routes = [
  {
    path: HOME,
    name: 'Домашня сторінка',
  },
  {
    path: SIGN_IN,
    name: 'Увійти в акаунт',
  },
  {
    path: NEW_BOOK,
    name: 'Додати книгу',
  },
  {
    pathRegex: `${BOOKS}/\\d$`,
    name: 'Редагувати книгу',
  },
];

export const deriveHeaderFromPath = path => {
  const currentRoute = routes.find(route => (
    route.path && route.path === path
  ) || (
    route.pathRegex && new RegExp(route.pathRegex).test(path)
  ));
  return currentRoute ? currentRoute.name : 'UBTS Library';
};

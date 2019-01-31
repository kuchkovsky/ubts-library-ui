export const HOME = '/';

export const SIGN_IN = '/signin';

export const BOOK_EDITOR = '/books/edit';

export const BOOK_EDITOR_NEW_BOOK = '/books/edit/new';

export const BOOK_VIEWER = '/books/view';

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
    path: BOOK_EDITOR_NEW_BOOK,
    name: 'Додати книгу',
  },
  {
    pathRegex: `${BOOK_EDITOR}/\\d$`,
    name: 'Редагувати книгу',
  },
  {
    pathRegex: `${BOOK_VIEWER}/\\d$`,
    name: 'Інформація про книгу',
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

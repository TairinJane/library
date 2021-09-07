import { TNavBarLink } from './list-item-link';

type TNavBarGroup = TNavBarLink[];

export const NavBarConfig: TNavBarGroup[] = [
  [
    {
      title: 'Home',
      to: '/',
    },
  ],
  [
    {
      title: 'Books Search',
      to: '/books',
    },
    {
      title: 'Lend Book',
      to: '/books/lend',
    },
  ],
  [
    {
      title: 'Readers Search',
      to: '/readers',
    },
    {
      title: 'New Reader',
      to: '/readers/new',
    },
  ],
  [
    {
      title: 'Authors',
      to: '/authors',
    },
    {
      title: 'New Author',
      to: '/authors/new',
    },
  ],
  [
    {
      title: 'Purchases',
      to: '/purchases',
    },
    {
      title: 'New Purchase',
      to: '/purchases/new',
    },
  ],
  [
    {
      title: 'Events',
      to: '/events',
    },
    {
      title: 'New Event',
      to: '/events/new',
    },
  ],
];

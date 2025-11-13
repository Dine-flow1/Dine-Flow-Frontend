export interface NavItem {
  name: string;
  href: string;
  current: boolean;
}

export const navigation: NavItem[] = [
  { name: 'Home', href: '/', current: true },
  { name: 'Hotels', href: '/hotels', current: false },
  { name: 'Orders', href: '/orders', current: false },
  { name: 'Login', href: '/login', current: false },
  { name: 'Sign Up', href: '/signUp', current: false },
  { name: 'Subscription', href: '/subscription', current: false },
  
];


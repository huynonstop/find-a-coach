import AuthPage from '@/pages/AuthPage.vue';
import CoachesPage from '@/pages/coaches/CoachesPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const routes = [
  { path: '/', name: 'home', redirect: '/coaches' },
  { path: '/coaches', name: 'coaches', component: CoachesPage },
  {
    path: '/auth',
    name: 'auth',
    component: AuthPage,
    meta: {
      needUnAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
    meta: { customLayout: true },
  },
];
export default routes;

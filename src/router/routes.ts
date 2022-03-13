import AuthPage from '@/pages/AuthPage.vue';
import CoachDetailPage from '@/pages/coaches/CoachDetailPage.vue';
import CoachesPage from '@/pages/coaches/CoachesPage.vue';
import CoachContact from '@/pages/coaches/CoachContact.vue';
import RequestsPage from '@/pages/RequestsPage.vue';
import CoachRegister from '@/pages/coaches/CoachRegister.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const routes = [
  { path: '/', name: 'home', redirect: '/coaches' },
  { path: '/coaches', name: 'coaches', component: CoachesPage },
  {
    path: '/coaches/:id',
    name: 'coach',
    component: CoachDetailPage,
    children: [
      {
        path: 'contact',
        name: 'coach/contact',
        component: CoachContact,
      },
    ],
  },
  {
    path: '/coach-register',
    name: 'coach-register',
    component: CoachRegister,
    meta: {
      needAuth: true,
    },
  },
  {
    path: '/requests',
    name: 'request',
    component: RequestsPage,
    meta: {
      needAuth: true,
    },
  },
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

import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import NotFound from '../pages/NotFound.vue';
import CoachDetails from '../pages/coaches/CoachDetails.vue';
import CoachesList from '../pages/coaches/CoachesList.vue';
import CoachRegister from '../pages/coaches/CoachRegister.vue';
import ContactCoach from '../pages/requests/ContactCoach.vue';
import RequestsList from '../pages/requests/RequestsList.vue';
import UserAuth from '../pages/auth/UserAuth.vue';
const routes = [
  { path: '/', redirect: '/coaches' },
  { path: '/coaches', component: CoachesList },
  {
    path: '/coaches/:id',
    component: CoachDetails,
    props: true,
    children: [
      {
        name: 'contact-coach',
        path: 'contact',
        component: ContactCoach,
      },
    ],
    meta: {
      basePath: '/coaches/',
    },
  },
  {
    path: '/auth',
    component: UserAuth,
    meta: {
      needUnAuth: true,
    },
  },
  {
    path: '/register',
    component: CoachRegister,
    meta: {
      needAuth: true,
    },
  },
  {
    path: '/requests',
    component: RequestsList,
    meta: {
      needAuth: true,
    },
  },
  { path: '/:notFound(.*)', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async function(to, from, next) {
  await store.dispatch('tryAuth');
  if (to.meta.needAuth && !store.getters.isAuth) {
    next('/auth');
  } else if (to.meta.needUnAuth && store.getters.isAuth) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;

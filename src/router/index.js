import { createRouter, createWebHistory } from 'vue-router';
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
  { path: '/auth', component: UserAuth },
  { path: '/register', component: CoachRegister },
  { path: '/requests', component: RequestsList },
  { path: '/:notFound(.*)', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

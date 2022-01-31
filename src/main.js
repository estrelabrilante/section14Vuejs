import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import BaseModal from './components/BaseModal.vue';
import CourseGoals from './pages/CourseGoals.vue';
import AllUsers from './pages/AllUsers.vue';

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AllUsers,
    },
    {
      path: '/goals',
      component: CourseGoals,
    },
  ],
});

app.component('base-modal', BaseModal);

app.use(router);
// only mount and render app, once the router is fully set up and aware of the page
router.isReady().then(function () {
  app.mount('#app');
});

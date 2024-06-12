import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TopIMDB from '../views/TopIMDB.vue'
import  Genre from '../views/Genre.vue'
import Movies from '../views/Movies.vue'
import Tvshowsh from '../views/Tvshowsh.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TopIMDB.vue')
    },
    {
      path : '/top-imdb',
      name : 'top-imdb',
      component : TopIMDB
    },
    {
      path : '/genre',
      name : 'genre',
      component : Genre
    },
    {
      path : '/movies',
      name : 'movies',
      component : Movies
    },
    {
      path : '/tv-shows',
      name : 'Tvshowsh',
      component : Tvshowsh
    }
  ]
})

export default router

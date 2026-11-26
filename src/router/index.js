import { createRouter, createWebHistory } from 'vue-router'
import IngredientesLista from '../views/IngredientesLista.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/ingredientes' },
    { path: '/ingredientes', component: IngredientesLista },
  ],
})
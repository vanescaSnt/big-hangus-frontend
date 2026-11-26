import { createRouter, createWebHistory } from 'vue-router'
import IngredientesLista from '../views/IngredientesLista.vue'
import IngredienteFormulario from '../views/IngredienteFormulario.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/ingredientes' },
    { path: '/ingredientes', component: IngredientesLista },
    { path: '/ingredientes/novo', component: IngredienteFormulario },
    { path: '/ingredientes/:id', component: IngredienteFormulario },
  ],
})
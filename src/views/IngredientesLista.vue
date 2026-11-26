<script setup>
import { ref, onMounted } from 'vue'
import { listarIngredientes } from '../services/ingredientes'

const ingredientes = ref([])

async function carregarIngredientes() {
  ingredientes.value = await listarIngredientes()
}

onMounted(carregarIngredientes)

function formatarNumero(valor) {
  return Number(valor).toLocaleString('pt-BR')
}

// "2026-12-20" vira "20/12/2026"
function formatarData(data) {
  if (!data) return '—'
  return data.split('-').reverse().join('/')
}
</script>

<template>
  <h1>Ingredientes</h1>

  <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Disponível</th>
        <th>Unidade</th>
        <th>Mínimo</th>
        <th>Validade</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ingrediente in ingredientes" :key="ingrediente.id">
        <td>{{ ingrediente.nome }}</td>
        <td>{{ formatarNumero(ingrediente.quantidade_disponivel) }}</td>
        <td>{{ ingrediente.unidade_medida }}</td>
        <td>{{ formatarNumero(ingrediente.quantidade_minima) }}</td>
        <td>{{ formatarData(ingrediente.data_validade) }}</td>
      </tr>
    </tbody>
  </table>
</template>
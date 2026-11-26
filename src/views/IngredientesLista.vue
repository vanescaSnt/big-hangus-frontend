<script setup>
import { ref, onMounted } from 'vue'
import { listarIngredientes } from '../services/ingredientes'

const ingredientes = ref([])
const busca = ref('')
const carregando = ref(false)
const mensagemDeErro = ref('')

async function carregarIngredientes() {
  carregando.value = true
  mensagemDeErro.value = ''
  try {
    ingredientes.value = await listarIngredientes({ nome: busca.value.trim() })
  } catch (erro) {
    mensagemDeErro.value = erro.message
  } finally {
    carregando.value = false
  }
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
  <RouterLink to="/ingredientes/novo">Novo ingrediente</RouterLink>

  <form @submit.prevent="carregarIngredientes">
    <input v-model="busca" type="search" placeholder="Buscar ingrediente por nome" />
    <button type="submit">Buscar</button>
  </form>

  <p v-if="carregando">Carregando...</p>
  <p v-else-if="mensagemDeErro">{{ mensagemDeErro }}</p>
  <p v-else-if="ingredientes.length === 0">Nenhum ingrediente encontrado.</p>

  <table v-else>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Disponível</th>
        <th>Unidade</th>
        <th>Mínimo</th>
        <th>Validade</th>
        <th>Situação</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr 
        v-for="ingrediente in ingredientes"
          :key="ingrediente.id"
          :class="{ 'em-baixa': ingrediente.em_baixa }"
      >
        <td>{{ ingrediente.nome }}</td>
        <td>{{ formatarNumero(ingrediente.quantidade_disponivel) }}</td>
        <td>{{ ingrediente.unidade_medida }}</td>
        <td>{{ formatarNumero(ingrediente.quantidade_minima) }}</td>
        <td>{{ formatarData(ingrediente.data_validade) }}</td>
        <td>{{ ingrediente.em_baixa ? 'Estoque baixo' : 'Em estoque' }}</td>
        <td>
          <RouterLink :to="`/ingredientes/${ingrediente.id}`">Editar</RouterLink>
          <button type="button">Excluir</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
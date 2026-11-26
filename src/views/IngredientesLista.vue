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
  <div class="topo">
    <h1>Ingredientes</h1>
    <RouterLink to="/ingredientes/novo" class="btn">Novo ingrediente</RouterLink>
  </div>

  <div class="card">
    <form class="busca" @submit.prevent="carregarIngredientes">
      <input v-model="busca" type="search" placeholder="Buscar ingrediente por nome" />
      <button type="submit" class="btn">Buscar</button>
    </form>

    <p v-if="carregando" class="estado">Carregando...</p>
    <p v-else-if="mensagemDeErro" class="estado estado--erro">{{ mensagemDeErro }}</p>
    <p v-else-if="ingredientes.length === 0" class="estado">Nenhum ingrediente encontrado.</p>

    <div v-else class="tabela">
      <table>
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
            <td>
              <span :class="['tag', ingrediente.em_baixa ? 'tag--alerta' : 'tag--ok']">
                {{ ingrediente.em_baixa ? 'Estoque baixo' : 'Em estoque' }}
              </span>
            </td>
            <td>
              <div class="acoes-linha">
                <RouterLink
                  :to="`/ingredientes/${ingrediente.id}`"
                  class="btn btn--secundario btn--pequeno"
                >
                  Editar
                </RouterLink>
                <button type="button" class="btn btn--secundario btn--pequeno">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.busca {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.busca input {
  flex: 1;
  max-width: 340px;
}

.estado {
  text-align: center;
  color: var(--cor-texto-suave);
  padding: 24px;
}

.estado--erro {
  color: var(--cor-primaria-escura);
}

.em-baixa {
  background: var(--cor-alerta-fundo);
}

/* fica em uma div, e não direto no <td>, para não quebrar o alinhamento da tabela */
.acoes-linha {
  display: flex;
  gap: 6px;
}
</style>
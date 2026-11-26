<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  consultarIngrediente,
  criarIngrediente,
  alterarIngrediente,
} from '../services/ingredientes'

const route = useRoute()
const router = useRouter()

// se a rota tem :id estamos editando; senão, estamos cadastrando
const id = route.params.id
const editando = Boolean(id)

const formulario = reactive({
  nome: '',
  preco: '',
  data_validade: '',
  quantidade_disponivel: '',
  unidade_medida: 'kg',
  quantidade_minima: '',
})

const erros = ref({})
const mensagemDeErro = ref('')
const carregando = ref(false)
const salvando = ref(false)

// na edição, busca o ingrediente e preenche o formulário
async function carregarIngrediente() {
  carregando.value = true
  try {
    const ingrediente = await consultarIngrediente(id)
    formulario.nome = ingrediente.nome
    formulario.preco = ingrediente.preco
    formulario.data_validade = ingrediente.data_validade ?? ''
    formulario.quantidade_disponivel = ingrediente.quantidade_disponivel
    formulario.unidade_medida = ingrediente.unidade_medida
    formulario.quantidade_minima = ingrediente.quantidade_minima
  } catch (erro) {
    mensagemDeErro.value = erro.message
  } finally {
    carregando.value = false
  }
}

onMounted(() => {
  if (editando) carregarIngrediente()
})

// transforma o que está no formulário no formato que a API espera
function montarDados() {
  return {
    nome: formulario.nome.trim(),
    preco: Number(formulario.preco),
    data_validade: formulario.data_validade || null, // data é opcional
    quantidade_disponivel: Number(formulario.quantidade_disponivel),
    unidade_medida: formulario.unidade_medida,
    quantidade_minima: Number(formulario.quantidade_minima),
  }
}

async function salvar() {
  mensagemDeErro.value = ''
  salvando.value = true
  try {
    const dados = montarDados()
    if (editando) {
      await alterarIngrediente(id, dados)
    } else {
      await criarIngrediente(dados)
    }
    router.push('/ingredientes')
  } catch (erro) {
    mensagemDeErro.value = erro.message
  } finally {
    salvando.value = false
  }
}
</script>

<template>
  <h1>{{ editando ? 'Editar ingrediente' : 'Novo ingrediente' }}</h1>

  <div class="card">
    <p v-if="carregando" class="aviso">Carregando...</p>

    <form v-else novalidate @submit.prevent="salvar">
      <p v-if="mensagemDeErro" class="aviso aviso--erro">{{ mensagemDeErro }}</p>

      <div class="campo">
        <label for="nome">Nome</label>
        <input id="nome" v-model="formulario.nome" type="text" />
        <p v-if="erros.nome" class="erro">{{ erros.nome }}</p>
      </div>

      <div class="campo">
        <label for="preco">Preço (R$)</label>
        <input id="preco" v-model="formulario.preco" type="number" step="0.01" min="0" />
        <p v-if="erros.preco" class="erro">{{ erros.preco }}</p>
      </div>

      <div class="campo">
        <label for="data_validade">Data de validade (opcional)</label>
        <input id="data_validade" v-model="formulario.data_validade" type="date" />
        <p v-if="erros.data_validade" class="erro">{{ erros.data_validade }}</p>
      </div>

      <div class="campo">
        <label for="quantidade_disponivel">Quantidade disponível</label>
        <input
          id="quantidade_disponivel"
          v-model="formulario.quantidade_disponivel"
          type="number"
          step="0.001"
          min="0"
        />
        <p v-if="erros.quantidade_disponivel" class="erro">
          {{ erros.quantidade_disponivel }}
        </p>
      </div>

      <div class="campo">
        <label for="unidade_medida">Unidade de medida</label>
        <select id="unidade_medida" v-model="formulario.unidade_medida">
          <option value="kg">kg</option>
          <option value="litros">litros</option>
        </select>
        <p v-if="erros.unidade_medida" class="erro">{{ erros.unidade_medida }}</p>
      </div>

      <div class="campo">
        <label for="quantidade_minima">Quantidade mínima</label>
        <input
          id="quantidade_minima"
          v-model="formulario.quantidade_minima"
          type="number"
          step="0.001"
          min="0"
        />
        <p v-if="erros.quantidade_minima" class="erro">{{ erros.quantidade_minima }}</p>
      </div>

      <div class="acoes">
        <button type="submit" class="btn" :disabled="salvando">
          {{ salvando ? 'Salvando...' : 'Salvar' }}
        </button>
        <RouterLink to="/ingredientes" class="btn btn--secundario">Cancelar</RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
  max-width: 420px;
}

.erro {
  color: var(--cor-primaria-escura);
  font-size: 14px;
}

.aviso {
  padding: 12px 0;
  color: var(--cor-texto-suave);
}

.aviso--erro {
  color: var(--cor-primaria-escura);
}

.acoes {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}
</style>
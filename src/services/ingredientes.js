import { API_URL } from './api'

// mensagens usadas quando a API não envia uma explicação em texto
const MENSAGENS_PADRAO = {
  404: 'Ingrediente não encontrado.',
  409: 'O nome já existe ou o ingrediente está em uso.',
}

export class ApiError extends Error {
  constructor(status, mensagem, errosPorCampo = {}) {
    super(mensagem)
    this.status = status
    this.errosPorCampo = errosPorCampo
  }
}

// Converte a resposta de erro do backend em um ApiError com mensagem legível
function criarErroDaResposta(status, corpoDaResposta) {
  const detalhes = corpoDaResposta?.detail

  if (status === 422 && Array.isArray(detalhes)) {
    const errosPorCampo = {}
    for (const detalhe of detalhes) {
      const campo = detalhe.loc[detalhe.loc.length - 1]
      errosPorCampo[campo] = detalhe.msg
    }
    return new ApiError(status, 'Há campos inválidos no formulário.', errosPorCampo)
  }

  // se o backend enviou uma mensagem em texto, usamos ela
  if (typeof detalhes === 'string') return new ApiError(status, detalhes)

  return new ApiError(status, MENSAGENS_PADRAO[status] ?? 'Erro inesperado. Tente novamente.')
}

async function requisitar(metodo, caminho, dados) {
  let resposta
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: dados ? JSON.stringify(dados) : undefined,
    })
  } catch {
    throw new ApiError(0, 'Não foi possível conectar ao servidor.')
  }

  // exclusão bem-sucedida, a resposta não tem corpo
  if (resposta.status === 204) return null

  const corpoDaResposta = await resposta.json().catch(() => null)
  if (!resposta.ok) throw criarErroDaResposta(resposta.status, corpoDaResposta)
  return corpoDaResposta
}
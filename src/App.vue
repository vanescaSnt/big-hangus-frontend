<template>
  <header class="cabecalho">
    <img src="/logo.png" alt="Big Hangus Hamburgueria" class="cabecalho__logo" />
    <p class="cabecalho__titulo">Controle de estoque</p>
  </header>

  <main class="conteudo">
    <RouterView />
  </main>
</template>

<style scoped>
.cabecalho {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 24px;
  background: var(--cor-primaria);
  border-bottom: 5px solid var(--cor-destaque);
}

.cabecalho__logo {
  height: 56px;
  border-radius: var(--raio);
}

.cabecalho__titulo {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}

.conteudo {
  max-width: 1000px;
  margin: 0 auto;
  padding: 28px 20px 48px;
}
</style>
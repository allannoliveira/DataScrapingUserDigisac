async function coletarTodasAsPaginas() {
  // Função que coleta os dados da tabela atual
  function coletarUsuarios() {
    const linhas = [...document.querySelectorAll('tr')];
    return linhas.map(linha => {
      const colunas = [...linha.querySelectorAll('td')].map(td => td.innerText.trim());
      return colunas.join(';');
    }).filter(l => l);
  }

  let resultados = [];
  let pagina = 1;

  while (true) {
    console.log(`📄 Coletando página ${pagina}...`);
    resultados.push(...coletarUsuarios());

    // Localiza o botão "Próximo"
    const botaoProximo = document.querySelector('button[aria-label="Go to next page"]');

    // Sai do loop se não encontrar ou estiver desabilitado
    if (!botaoProximo || botaoProximo.disabled) {
      console.log("🚫 Última página alcançada.");
      break;
    }

    // Clica no botão e espera a próxima página carregar
    botaoProximo.click();
    await new Promise(r => setTimeout(r, 2500));
    pagina++;
  }

  // Cria o CSV e baixa automaticamente
  const csv = resultados.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'usuarios_digisac.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log('✅ Exportação concluída! Total de registros:', resultados.length);
}

coletarTodasAsPaginas();

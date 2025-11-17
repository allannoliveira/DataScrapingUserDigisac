📘 Guia: Como Extrair Todos os Usuários do DigiSac Usando o Script no Navegador

Este guia explica passo a passo como coletar todos os usuários de um setor no DigiSac, mesmo quando o sistema mostra apenas 15 resultados por página.
O processo utiliza um script simples executado diretamente no Console do navegador (Chrome).

🔧 Requisitos

Navegador Google Chrome

Acesso ao painel de usuários dentro do DigiSac

Permissão de visualização das páginas paginadas

🧭 Passo 1 — Acessar a tela de usuários

Entre no DigiSac normalmente.

Abra o menu onde estão listados os usuários do setor.

Verifique que a lista está exibindo apenas 15 resultados, com paginação (ex.: “Mostrando 15 de 107 resultados”).

🛠️ Passo 2 — Abrir o Console do Chrome

No teclado, pressione:

F12


Na janela que abrir, selecione a aba:

Console

🔒 Passo 3 — Habilitar a colagem de scripts no Chrome

Por segurança, o Chrome exibe um alerta ao colar código no Console.

Digite:

allow pasting


e pressione Enter.

Isso libera a colagem do script no passo seguinte.

🚀 Passo 4 — Executar o Script

Copie e cole o script abaixo inteiro no Console e pressione Enter:

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

📝 O que o script faz?

Lê todas as linhas da tabela exibida na página.

Clica automaticamente no botão:

aria-label="Go to next page"


Repete o processo até chegar na última página.

Gera um arquivo chamado:

usuarios_digisac.csv


E baixa automaticamente no seu computador.

📂 Estrutura do arquivo gerado

O arquivo CSV conterá as colunas da tabela exatamente como aparecem na interface do DigiSac, por exemplo:

Nome;Email;Função;Grupo
João Silva;joao@empresa.com;Atendente;ESCALAS
Maria Souza;maria@empresa.com;Administrador;ESCALAS
...

🧩 Dicas importantes

Não feche a aba do DigiSac enquanto o script estiver rodando.

O tempo total depende de quantas páginas existem.

Caso os dados não apareçam corretamente no Excel, use “Texto para colunas” via delimitador ;.

❓ Problemas comuns
🔸 O script não avança de página

➡️ Verifique se o botão realmente possui o atributo:

aria-label="Go to next page"


Se não tiver, envie o HTML do botão e posso ajustar o script para você.

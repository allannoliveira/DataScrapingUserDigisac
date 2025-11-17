# 📘 Extração de Usuários do DigiSac via Console do Navegador

Este repositório contém instruções e o script utilizado para extrair **todos os usuários listados no DigiSac**, mesmo quando o sistema mostra apenas 15 usuários por página.  
A técnica utiliza um script em JavaScript executado diretamente no **Console do Chrome**, que navega automaticamente por todas as páginas e gera um arquivo `.csv` completo.

----------

## 📌 Índice

-   Visão Geral
    
-   Requisitos
    
-   Passo a Passo
    
    -   1. Acessar a lista de usuários
        
    -   2. Abrir o Console do Chrome
        
    -   3. Habilitar colagem de código
        
    -   4. Executar o script
        
-   Script Completo
    
-   Saída Gerada
    
-   Possíveis Problemas
    
-   Licença
    

----------

## 📖 Visão Geral

O DigiSac exibe apenas **15 usuários por página**, tornando difícil coletar todos os registros.  
Este script:

-   Percorre automaticamente **todas as páginas** usando o botão “Go to next page”
    
-   Captura todas as linhas visíveis da tabela
    
-   Monta um arquivo `.csv`
    
-   Efetua automaticamente o download do arquivo completo
    

----------

## 🧑‍💻 Requisitos

-   Google Chrome
    
-   Acesso ao **DigiSac**
    
-   Permissão para visualizar a lista de usuários
    

----------

## 🧭 Passo a Passo

### **1. Acessar a lista de usuários**

No DigiSac, abra o módulo onde os usuários do setor estão listados.

----------

### **2. Abrir o Console do Chrome**

Use o atalho:

`F12` 

E clique na aba:

`Console` 

----------

### **3. Habilitar colagem de código**

Por segurança, o Chrome não permite colar scripts no console sem liberação.

Digite:

`allow pasting` 

Pressione **Enter**.

----------

### **4. Executar o script**

Cole o script abaixo e pressione **Enter**.

----------

## 🧩 Script Completo

``async  function  coletarTodasAsPaginas() { // Função que coleta os dados da tabela atual  function  coletarUsuarios() { const linhas = [...document.querySelectorAll('tr')]; return linhas.map(linha => { const colunas = [...linha.querySelectorAll('td')].map(td => td.innerText.trim()); return colunas.join(';');
    }).filter(l => l);
  } let resultados = []; let pagina = 1; while (true) { console.log(`📄 Coletando página ${pagina}...`);
    resultados.push(...coletarUsuarios()); // Localiza o botão "Próximo"  const botaoProximo = document.querySelector('button[aria-label="Go to next page"]'); // Sai do loop se não encontrar ou estiver desabilitado  if (!botaoProximo || botaoProximo.disabled) { console.log("🚫 Última página alcançada."); break;
    } // Clica no botão e espera a próxima página carregar botaoProximo.click(); await  new  Promise(r => setTimeout(r, 2500));
    pagina++;
  } // Cria o CSV e baixa automaticamente  const csv = resultados.join('\n'); const blob = new  Blob([csv], { type: 'text/csv' }); const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'usuarios_digisac.csv'; document.body.appendChild(link);
  link.click(); document.body.removeChild(link); console.log('✅ Exportação concluída! Total de registros:', resultados.length);
} coletarTodasAsPaginas();`` 

----------

## 📂 Saída Gerada

O arquivo baixado terá o nome:

`usuarios_digisac.csv` 

E conterá exatamente as colunas visíveis na tabela do DigiSac, algo como:

`Nome;Email;Função;Grupo
Allan Oliveira;allan@empresa.com;Administrador;ESCALAS
Maria Souza;maria@empresa.com;Atendente;SUPORTE
...` 

----------

## ⚠️ Possíveis Problemas

### 🔸 O script não troca de página

Verifique se o botão realmente possui:

`aria-label="Go to next page"` 

Se for diferente no seu painel, ajuste o seletor ou abra uma issue.

### 🔸 O arquivo CSV abre bagunçado no Excel

Use a opção:

`Dados → Texto para colunas → Delimitado → Ponto e vírgula` 

----------

## 📜 Licença

Este projeto é distribuído sob a licença **MIT**.  
Você pode usar, modificar e compartilhar livremente.

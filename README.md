<div align="center">

# Automation Exercise

**Automação de testes End-to-End com Cypress**

Projeto de conclusão de curso • 10 cenários • Execução local e integração contínua

![Cypress](https://img.shields.io/badge/Cypress-15.19.0-17202C?style=flat-square&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-22%20%7C%2024-339933?style=flat-square&logo=nodedotjs&logoColor=white)
[![GitHub Actions](https://github.com/mouracamilaluiza/automation-exercise/actions/workflows/e2e.yml/badge.svg)](https://github.com/mouracamilaluiza/automation-exercise/actions/workflows/e2e.yml)
[![BrowserStack](https://img.shields.io/badge/BrowserStack-configurado-FF6C37?style=flat-square&logo=browserstack&logoColor=white)](browserstack.json)
![Allure](https://img.shields.io/badge/Allure-Report-FF6C37?style=flat-square)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Allure_Report-222222?style=flat-square&logo=github&logoColor=white)](https://mouracamilaluiza.github.io/automation-exercise/)
![Mochawesome](https://img.shields.io/badge/Mochawesome-HTML%20%2F%20JSON-2E7D32?style=flat-square)

[Relatório Allure](https://mouracamilaluiza.github.io/automation-exercise/) · [GitHub Actions](https://github.com/mouracamilaluiza/automation-exercise/actions) · [Aplicação](https://automationexercise.com) · [Casos oficiais](https://automationexercise.com/test_cases)

</div>

---

## Sobre o projeto

Suíte de testes desenvolvida como trabalho individual de conclusão, utilizando a aplicação fictícia **Automation Exercise**. O projeto cobre cadastro, autenticação, catálogo, pesquisa, inscrição e compra, com cenários independentes, dados exclusivos por execução e relatórios de evidências.

| Requisito | Implementação |
| --- | --- |
| Casos obrigatórios | 1, 2, 3, 4, 5, 8, 9, 10, 15 e 16 |
| Integração contínua | GitHub Actions em push, pull request e execução manual |
| Seletores e padrões | `data-qa`, IDs e seletores delimitados por componente; módulo de página reutilizável |
| Gestão de dados | Criação de massa exclusiva e limpeza das contas por API |
| Evidências | Allure, Mochawesome, vídeos e capturas em caso de falha |
| Publicação de relatórios | Workflow de deploy do Allure no GitHub Pages |
| Execução na nuvem | Configuração para BrowserStack Automate |

## Validação registrada

**10 testes aprovados · 0 falhas · 0 testes ignorados · Sem retries**

| Data | Ambiente | Duração |
| --- | --- | --- |
| 27/10/2026 | Windows · Chrome 156 · Cypress 15.19.0 · Node.js 24.16.0 | 3min39s |

```sh
npm run test:chrome -- --config retries=0
```

Allure e Mochawesome foram validados juntos nessa execução local: dez resultados aprovados, etapas registradas, relatórios gerados e vídeo disponível. Consulte o badge do GitHub Actions para o estado atual da execução remota e o link do Allure para o último relatório publicado. A execução no BrowserStack depende das credenciais configuradas no repositório.

## Execução

### Pré-requisitos

- Node.js 22 ou 24 e npm.
- Acesso à internet para instalar dependências e acessar a aplicação.
- Google Chrome para executar com `test:chrome`.
- Java 17 ou superior no `PATH` para gerar e abrir o Allure Report 2.

### Início rápido

Na raiz do projeto:

```sh
npm ci
npm run test:chrome
```

### Comandos disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm test` | Executa a suíte no Electron, em modo headless |
| `npm run test:open` | Abre a interface do Cypress para desenvolvimento |
| `npm run test:chrome` | Executa a suíte no Chrome, em modo headless |
| `npm run test:chrome -- --config retries=0` | Executa no Chrome sem repetição automática |
| `npm run test:browserstack` | Executa na nuvem e aguarda o resultado |
| `npm run allure:generate` | Gera o site do Allure com os resultados da última execução |
| `npm run allure:open` | Inicia um servidor local e abre o relatório Allure |
| `npm run allure:clean` | Remove resultados e relatório Allure anteriores |

O binário do Cypress é baixado na instalação. Caso a política local do npm bloqueie os scripts necessários:

```sh
npx cypress install
npx cypress verify
```

## Cenários automatizados

| ID | Cenário | Verificações principais |
| --- | --- | --- |
| TC01 | Cadastrar usuário | Formulário completo, conta criada, sessão autenticada e exclusão |
| TC02 | Login com credenciais válidas | Identificação do usuário autenticado e exclusão da conta |
| TC03 | Login com credenciais inválidas | Mensagem de erro e ausência de sessão |
| TC04 | Logout | Redirecionamento para login e encerramento da sessão |
| TC05 | Cadastro com e-mail existente | Rejeição do cadastro duplicado |
| TC08 | Listagem e detalhes de produtos | Nome, categoria, preço, disponibilidade, condição e marca |
| TC09 | Pesquisa de produto | Resultados não vazios e relacionados ao termo informado |
| TC10 | Inscrição no rodapé | Mensagem de confirmação da inscrição |
| TC15 | Cadastro antes do checkout | Cadastro pela interface, endereços, pedido, pagamento e exclusão |
| TC16 | Login antes do checkout | Login pela interface, endereços, pedido, pagamento e exclusão |

> **Confirmação de compra:** os casos TC15 e TC16 verificam a rota `/payment_done/` e os textos `Order Placed!` e `Congratulations! Your order has been confirmed!`, apresentados pela aplicação na validação. O enunciado oficial utiliza uma mensagem de sucesso diferente.

## Estrutura do projeto

```text
.
├── .github/
│   └── workflows/
│       ├── e2e.yml                           # Pipeline principal
│       └── browserstack.yml                  # Execução manual na nuvem
├── cypress/
│   ├── e2e/
│   │   └── automation-exercise-modules.cy.js  # Dez cenários obrigatórios
│   ├── pages/
│   │   └── shop.js                           # Ações e verificações da interface
│   └── support/
│       ├── e2e.js                            # Reporter e bloqueio de publicidade
│       └── user.js                           # Massa de dados e operações de API
├── browserstack.json                         # Configuração da nuvem
├── scripts/                                  # Limpeza e validação dos resultados Allure
├── cypress.config.js                         # Configuração do Cypress
├── package.json                              # Scripts e dependências
├── package-lock.json                         # Versões fixadas das dependências
└── README.md
```

### Estratégia de automação

- **Isolamento:** cada teste recebe um e-mail exclusivo e não depende da ordem de execução.
- **Preparação por API:** as [APIs oficiais](https://automationexercise.com/api_list) criam as pré-condições dos casos TC02, TC04, TC05 e TC16. Os cadastros de TC01 e TC15 são realizados pela interface.
- **Seletores:** prioridade para atributos `data-qa`, IDs e links dentro de componentes.
- **Sincronização:** asserções e esperas nativas do Cypress, sem pausas fixas ou cliques forçados.
- **Limpeza:** o `afterEach` tenta excluir as contas inclusive após falhas. Interrupções abruptas do processo podem impedir essa etapa.
- **Tratamento de falhas:** exceções da aplicação não são suprimidas globalmente. Uma repetição é permitida no modo headless e fica registrada no relatório.
- **Rede:** apenas publicidade externa é bloqueada; os fluxos funcionais usam respostas reais da aplicação.

## Relatórios e evidências

### Allure Report

O adaptador oficial `allure-cypress` coleta resultados, etapas dos comandos e anexos durante a execução. O Allure e o Mochawesome compartilham os eventos do Cypress por meio do `cypress-on-fix`.

```sh
npm run test:chrome
npm run allure:generate
npm run allure:open
```

Execute a geração mesmo quando os testes retornarem falha para consultar o diagnóstico. Os comandos de teste local limpam os resultados Allure anteriores, evitando misturar execuções. Chamadas diretas a `npx cypress run` exigem `npm run allure:clean` antes da execução.

| Artefato Allure | Local |
| --- | --- |
| Resultados brutos e anexos | `allure-results/` |
| Site estático para publicação | `allure-report/` |

Use `allure:open` para visualizar localmente: abrir apenas o HTML pelo sistema de arquivos pode bloquear o carregamento dos dados. A geração falha se não houver resultados, impedindo a publicação de um relatório vazio. Testes reprovados continuam produzindo resultados válidos para gerar o relatório.

### Mochawesome

O **Mochawesome** gera o relatório ao final da execução. Abra `cypress/reports/index.html` no navegador.

| Artefato | Local |
| --- | --- |
| Relatório HTML | `cypress/reports/index.html` |
| Relatório JSON | `cypress/reports/index.json` |
| Vídeos | `cypress/videos/` |
| Capturas de falha | `cypress/screenshots/` |

As capturas de falha são incorporadas ao relatório. Os artefatos gerados estão no `.gitignore` e não são versionados.

## Integração contínua

O workflow [Cypress E2E](.github/workflows/e2e.yml) instala as dependências com `npm ci` e executa os testes no Chrome, em um runner Ubuntu com Node.js 22.

| Evento | Execução |
| --- | --- |
| `push` | Automática |
| `pull_request` | Automática |
| `workflow_dispatch` | Manual pela aba Actions |

Para consultar os resultados, acesse **Actions → Cypress E2E → execução → Artifacts** e baixe `cypress-evidencias-<número>`.

Relatórios, vídeos e capturas são publicados mesmo quando a suíte falha, com retenção de **14 dias**. Uma falha nos testes mantém o job com status de erro.

### Publicação no GitHub Pages

O workflow publica o diretório `allure-report/` usando as actions oficiais `configure-pages`, `upload-pages-artifact` e `deploy-pages`.

1. Envie o projeto para o repositório GitHub de destino.
2. Acesse **Settings → Pages → Build and deployment → Source** e selecione **GitHub Actions**.
3. Faça um push na branch padrão ou execute **Actions → Cypress E2E → Run workflow** nessa branch.
4. Consulte o endereço publicado no ambiente **github-pages** ou no job **Publicar Allure no GitHub Pages**.

A publicação ocorre somente na branch padrão do repositório. Pull requests e outras branches geram artefatos sem substituir o relatório público. O job de deploy recebe permissões `pages: write` e `id-token: write`; o workflow não exige token pessoal.

Se houver falhas nos testes, o relatório ainda pode ser publicado para diagnóstico e o job de testes permanece reprovado. Se a geração do Allure falhar, o deploy não ocorre. Cada publicação substitui a anterior; o histórico entre execuções não é agregado nesta configuração. Os artefatos do Actions permanecem disponíveis por 14 dias.

**Endereço do relatório:** [mouracamilaluiza.github.io/automation-exercise](https://mouracamilaluiza.github.io/automation-exercise/). O conteúdo é atualizado após a conclusão do job de deploy na branch principal.

## BrowserStack

O workflow [BrowserStack Cypress](.github/workflows/browserstack.yml) é executado manualmente para controlar o consumo da cota da conta.

### Credenciais

Configure as variáveis abaixo no terminal ou em **Settings → Secrets and variables → Actions** do repositório:

| Variável / Secret | Conteúdo |
| --- | --- |
| `BROWSERSTACK_USERNAME` | Usuário da conta BrowserStack |
| `BROWSERSTACK_ACCESS_KEY` | Chave de acesso da conta |

Exemplo no PowerShell, substituindo os valores pelas suas credenciais:

```powershell
$env:BROWSERSTACK_USERNAME = 'seu-usuario'
$env:BROWSERSTACK_ACCESS_KEY = 'sua-chave'
npm run test:browserstack
```

Não inclua credenciais em arquivos versionados.

### Execução e ambiente

```sh
npx browserstack-cypress run --sync --spec "cypress/e2e/automation-exercise-modules.cy.js"
```

A configuração utiliza **Chrome / Windows 11** e **Cypress `15.latest`**, conforme a [documentação de versões suportadas](https://www.browserstack.com/docs/automate/cypress/supported-versions). A versão minor da nuvem pode diferir da versão local fixada no lockfile.

O parâmetro `--sync` aguarda o resultado da execução, disponível no painel Automate. Local Testing está desativado porque a aplicação é pública.

## Publicação e entrega

Crie um repositório vazio no GitHub e execute os comandos abaixo na raiz do projeto, substituindo a URL de exemplo:

```sh
git init
git add .
git commit -m "Implementa casos obrigatorios do Automation Exercise"
git branch -M main
git remote add origin https://github.com/mouracamilaluiza/automation-exercise.git
git push -u origin main
```

Antes da entrega:

- Confira a execução do workflow **Cypress E2E** após o push.
- Baixe e verifique o relatório disponibilizado nos artefatos.
- Configure os secrets e execute o workflow do BrowserStack, caso seja exigido.
- Entregue a URL do repositório e os links das execuções solicitadas.

## Solução de problemas

| Sintoma | Ação sugerida |
| --- | --- |
| Falha de rede ou download | Verifique acesso a `automationexercise.com` e aos servidores do npm/Cypress |
| Cypress encerra sem abrir em um terminal de aplicativo Electron | Remova `ELECTRON_RUN_AS_NODE` e `ELECTRON_NO_ATTACH_CONSOLE` apenas da sessão do terminal |
| BrowserStack não autentica | Confira as duas variáveis de ambiente ou os secrets do repositório |
| Falha após alteração ou indisponibilidade do site | Analise o relatório, a captura e o vídeo antes de alterar seletores |

A suíte depende da disponibilidade de uma aplicação externa. O resultado registrado representa a execução informada, não uma garantia de disponibilidade contínua.

<details>
<summary><strong>Auditoria de dependências</strong></summary>

O `npm audit` da instalação apontou quatro ocorrências na árvore de dependências do `browserstack-cypress-cli@1.37.2`: três moderadas e uma alta. Essa era a versão publicada consultada na preparação do projeto.

A sugestão automática do npm era um downgrade incompatível. Não foi aplicado `npm audit fix --force`. Reavalie as dependências ao atualizar o projeto.

</details>

## Referências

- [Automation Exercise — casos de teste](https://automationexercise.com/test_cases)
- [Automation Exercise — APIs](https://automationexercise.com/api_list)
- [BrowserStack — configuração de capabilities](https://www.browserstack.com/docs/automate/cypress/cypress-capabilities)
- [BrowserStack — versões do Cypress](https://www.browserstack.com/docs/automate/cypress/supported-versions)

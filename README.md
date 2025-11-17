# Gerenciador de Tarefas com Autenticação (Vue.js, Vite, VueX, Pinia, Vue Router)

## Rodar com Docker
```bash
docker compose up
```
Abra http://localhost:5173



Este projeto é uma aplicação web de gerenciamento de tarefas (To-Do List) desenvolvida com **Vue.js 3**, utilizando **Vite** como *bundler*, **Pinia** para gerenciamento de estado e **Vue Router** para navegação.

A aplicação simula um ambiente de trabalho com funcionalidades de autenticação, dashboard e CRUD (Criação, Leitura, Atualização e Exclusão) de tarefas.

## 🌟 Funcionalidades Principais

| Módulo | Funcionalidades | Tecnologias Envolvidas |
| :--- | :--- | :--- |
| **Autenticação** | Cadastro de Usuário (`/register`), Login (`/login`), Logout. | `userStore.js` (Pinia), LocalStorage |
| **Gerenciamento de Tarefas** | Criação (`/create-task`), Visualização (Dashboard `/dashboard`), Edição (`/edit-task/:id`), Exclusão, Detalhes (`/task-details/:id`). | `taskStore.js` (Pinia), LocalStorage |
| **Estado Global** | Gerenciamento de tarefas, usuários, notificações e tema. | Pinia (`taskStore`, `userStore`, `notificationStore`, `themeStore`) |
| **Interface** | Dashboard com listagem de tarefas, barra lateral (`Sidebar.vue`), cabeçalho (`Header.vue`), e modal de perfil. | Vue.js Components, CSS/Estilização |
| **Experiência do Usuário** | Notificações temporárias (`Notification.vue`), Modal de Mensagens, Alternância de Tema (Claro/Escuro). | `notificationStore.js`, `themeStore.js` |

## 🛠️ Tecnologias Utilizadas

*   **Framework:** Vue.js 3
*   **Build Tool:** Vite
*   **Gerenciamento de Estado:** Pinia
*   **Roteamento:** Vue Router
*   **Requisições HTTP:** Axios (presente no `package.json`, indicando possível uso futuro ou em partes não visíveis)
*   **Persistência de Dados:** LocalStorage (para usuários e tarefas)
*   **Containerização:** Docker e Docker Compose

## 🐳 Instruções de Instalação e Execução (Ambiente Containerizado)

Conforme solicitado, a aplicação está configurada para ser executada facilmente em um ambiente containerizado usando **Docker Compose**. Esta é a forma **recomendada** para garantir que o ambiente do professor seja idêntico ao ambiente de desenvolvimento.

### Pré-requisitos

Certifique-se de ter o **Docker** e o **Docker Compose** instalados em sua máquina.

### 1. Clonar o Repositório

```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd [NOME_DO_DIRETORIO]
```

### 2. Executar a Aplicação com Docker Compose

O arquivo `compose.yml` e o script `compose-up.cmd` (para Windows) ou o comando `docker compose up` (para Linux/macOS) configuram e iniciam o contêiner de desenvolvimento.

**Opção A: Usando o script (Windows)**

```bash
./compose-up.cmd
```

**Opção B: Usando o comando padrão (Linux/macOS ou PowerShell)**

```bash
docker compose up
```

O Docker Compose fará o seguinte:
1.  Baixará a imagem base `papadopoli/vue-vite-dev:latest`.
2.  Montará o diretório do projeto (`.`) dentro do contêiner em `/workspace`.
3.  Instalará as dependências do Node.js/NPM (se necessário).
4.  Iniciará o servidor de desenvolvimento do Vite.

### 3. Acessar a Aplicação

Após a inicialização, a aplicação estará acessível no seu navegador:

[http://localhost:5173](http://localhost:5173)

O servidor de desenvolvimento do Vite está configurado para rodar na porta `5173` dentro do contêiner, que é mapeada para a porta `5173` da sua máquina hospedeira.

## ⚙️ Instruções de Execução (Ambiente Local - Alternativa)

Se preferir rodar a aplicação diretamente na máquina local (sem Docker), siga estes passos:

### Pré-requisitos

*   Node.js (versão 18+)
*   NPM ou Yarn

### 1. Instalar Dependências

```bash
npm install
# ou
yarn install
```

### 2. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em [http://localhost:5173](http://localhost:5173) (ou outra porta indicada pelo Vite).

## 🗺️ Estrutura do Projeto

A estrutura do projeto segue as convenções modernas do Vue.js e Vite, com o uso de Pinia e Vue Router.

```
.
├── src/
│   ├── assets/             # Arquivos estáticos (imagens, etc.)
│   ├── components/         # Componentes reutilizáveis (Header, Sidebar, TaskCard, etc.)
│   ├── router/             # Configuração do Vue Router (`index.js`)
│   ├── stores/             # Módulos Pinia para gerenciamento de estado
│   │   ├── taskStore.js    # Lógica de CRUD de tarefas
│   │   ├── userStore.js    # Lógica de Autenticação e Registro
│   │   ├── notificationStore.js # Gerenciamento de notificações e mensagens
│   │   └── themeStore.js   # Lógica de alternância de tema (Claro/Escuro)
│   ├── views/              # Componentes de página (Landing, Dashboard, Login, etc.)
│   ├── App.vue             # Componente raiz
│   └── main.js             # Ponto de entrada da aplicação
├── compose.yml             # Configuração do Docker Compose
├── package.json            # Dependências e scripts do projeto
└── vite.config.js          # Configuração do Vite
```

## 📝 Detalhes Importantes

### Gerenciamento de Estado (Pinia)

O estado da aplicação é gerenciado por quatro *stores* Pinia, garantindo uma separação clara de responsabilidades:

1.  **`useUserStore`**: Responsável pela autenticação. O registro e login são simulados e os dados do usuário são persistidos no **LocalStorage**.
2.  **`useTaskStore`**: Implementa a lógica de **CRUD de tarefas**. As tarefas são persistidas no **LocalStorage** para simular um backend.
3.  **`useNotificationStore`**: Gerencia notificações temporárias e mensagens persistentes.
4.  **`useThemeStore`**: Controla a alternância entre os temas Claro e Escuro, persistindo a preferência no **LocalStorage**.

### Roteamento e Proteção de Rotas

O arquivo `src/router/index.js` define as rotas e implementa uma **Guarda de Rota (`router.beforeEach`)**.

*   **Rotas Protegidas:** `/dashboard`, `/create-task`, `/edit-task/:id`, `/task-details/:id`.
*   **Mecanismo:** A `meta` tag `requiresAuth: true` é usada para indicar rotas que exigem que o usuário esteja logado. Se um usuário não autenticado tentar acessar, ele será redirecionado para a página de Login (`/login`).

### Persistência de Dados

É crucial notar que, para fins de demonstração e execução *client-side*, todos os dados (usuários e tarefas) são armazenados no **LocalStorage** do navegador. Isso significa que:

*   Os dados persistem entre recarregamentos da página.
*   Os dados são isolados por navegador/máquina.
*   Não há um backend real ou banco de dados.

### Scripts de Execução

O script `dev` no `package.json` é:
```json
"dev": "vite"
```
No entanto, o `compose.yml` sobrescreve a execução para garantir que o servidor Vite seja acessível de fora do contêiner, usando:
```yaml
command: ["bash","-lc","...; npm run dev -- --host 0.0.0.0 --port 5173 --strictPort"]
```
Isto é uma prática padrão em ambientes Docker para desenvolvimento web.


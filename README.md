
# Desafio Angular - Gerenciamento de Números de Telefone

## Descrição
Este projeto foi criado para uma operadora de telecomunicações gerenciar números de telefone. Ele permite listar, criar, editar e excluir números, além de oferecer funcionalidades como paginação e formatação de valores monetários.

## Funcionalidades Implementadas
- **CRUD Completo**: Operações de criação, leitura, atualização e exclusão de números de telefone.
- **Lazy Loading**: Carregamento otimizado de módulos conforme a necessidade.
- **Paginação**: Navegação eficiente em grandes volumes de dados.
- **Design Responsivo**: Layout adaptável a desktop, tablet e mobile usando SCSS com BEM.
- **Angular Forms**: Validação de formulários com Reactive Forms e máscaras de telefone e valores monetários.
- **Consumo de API**: Simulação de interação com uma API real através de um serviço.

## Decisões Técnicas
- **BEM (Block Element Modifier)**: Optei pela metodologia BEM para garantir modularidade, reutilização e escalabilidade do CSS, evitando limitações de bibliotecas como o Bootstrap.
- **Angular**: Utilizei a versão mais recente do Angular para garantir suporte a novos recursos e melhorar a performance do projeto.

## Correções
- **Máscara de Valores Monetários**: Corrigimos o comportamento ao trocar a moeda, garantindo que a máscara seja reaplicada corretamente.
- **IDs Incrementais**: Alteramos a lógica de geração de IDs para usar um contador incremental, resultando em IDs menores e mais gerenciáveis.

## Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <DIRETORIO_DO_REPOSITORIO>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Rode o projeto:
   ```bash
   ng serve
   ```

Acesse em `http://localhost:4200/`.

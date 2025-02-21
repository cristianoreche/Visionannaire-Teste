
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

## Como os Dados São Armazenados

Os dados dos números de telefone são armazenados no localStorage do navegador. Isso permite que as informações persistam mesmo após o recarregamento da página. O uso do localStorage foi escolhido para simular um banco de dados simples, sem a necessidade de configurar um backend.

### Estrutura dos Dados

Cada número de telefone é armazenado como um objeto com a seguinte estrutura:

```typescript
interface Phone {
  id: number; // Identificador único
  value: string; // Número de telefone formatado
  monthlyPrice: string; // Preço mensal formatado
  setupPrice: string; // Preço de configuração formatado
  currency: string; // Moeda (BRL, USD, EUR)
}
```

### Métodos de Armazenamento

- **Salvar Dados**: Quando um novo número é criado ou um existente é atualizado, os dados são salvos no localStorage.
- **Carregar Dados**: Ao iniciar a aplicação, os números de telefone são carregados do localStorage.
- **Excluir Dados**: Quando um número é excluído, ele é removido do localStorage.

### Exemplo de Uso

- **Salvar um número**:

```typescript
localStorage.setItem('phones', JSON.stringify(phones));
```

- **Carregar números**:

```typescript
const phones = JSON.parse(localStorage.getItem('phones') || '[]');
```

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

4. Acesse em [http://localhost:4200/](http://localhost:4200/).

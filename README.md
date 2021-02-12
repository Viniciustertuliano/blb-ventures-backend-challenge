# Desafio de Programação

O desafio consiste em desenvolver uma simples página minimalista para um ecommerce.

Esse ecommerce não possui carrinho, não precisa realizar a compra e nem mostrar os detalhes dos produtos. Ele apenas lista os produtos e no modo de "edição" é possivel adicionar e deletar produtos.

## Para a resolução

Crie um repositório privado no github e coloque os seguintes usuários como colaboradores do projeto:

- [https://github.com/edusig](https://github.com/edusig)
- [https://github.com/bellini666](https://github.com/bellini666)

Faça a resolução em uma branch separada e abra um Pull Request para a branch `main` para que possamos avaliar.

O motivo de pedirmos um repositório privado é para não abrir a sua resolução para outros candidatos que estão fazendo o mesmo desafio.

## Frontend

### Como Rodar

Instale as dependencias com Yarn ou NPM

```bash
yarn install
# ou
npm install
```

Para rodar o servidor local do frontend na porta 8000:

```bash
yarn start
# ou
npm start
```

### Detalhes

Para o teste de Frontend o backend já estará pronto e as instruções para roda-lo e documentação da API estarão listadas a baixo na seção de Backend.

Sinta-se livre para utilizar as ferramentas que você tem mais confiança em trabalhar, porém recomendamos fortemente a utilização de algum tipo de framework web como React, Vue, Svelte ou Angular e alguma biblioteca de UI como Material-UI, Tailwind, Bootstrap.

Por favor, coloque todos os arquivos para rodar o projeto dentro da pasta `frontend` e de preferencia defina o script `start` dentro do `package.json` para rodar um servidor local na porta `8000`.

### Design e Protótipo

O design e protótipo do desafio se encontram aqui:

[AdobeXD](https://xd.adobe.com/view/04baddb5-dfb3-4277-99c3-c3f0dc8b5d96-51e9/)

Nele é possivel ver as interações esperadas e também cores e assets necessários para a realização do teste. Caso tenha alguma dúvida em relação a utilização do AdobeXD não hesite em nos enviar um email.

### Entregas esperadas

- [ ] Reproduzir fielmente o design e protótipo definido no AdobeXD;
- [ ] Permitir o usuário listar os produtos utilizando a API;
- [ ] Permitir o usuário adicionar novos produtos utilizando a API; e
- [ ] Permitir o usuário deletar produtos utilizando a API.

## Backend

### Como Rodar

Primeiramente crie um virtualenv e instale as dependências:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Para rodar o servidor local da API REST na porta 5000:

```bash
source .venv/bin/active  # se já não estiver ativado
python3 server.py 0.0.0.0:5000
```

### Detalhes

Para o teste de Backend o frontend já estará pronto e as instruções para roda-lo e o link para o design e prototipo no AdobeXD estarão listados a cima na seção de Frontend.

Sinta-se livre para utilizar as ferramentas que você tem mais confiança em trabalhar, porém recomendamos fortemente a utilização de algum tipo de framework web, como Flask, Django, FastAPI e afins.

Por favor, coloque todos os arquivos para rodar o projeto dentro da pasta `backend` e de preferencia aponte o servidor local para a porta `5000`

### API

A API deve ser criada no formato [RESTFul](https://en.wikipedia.org/wiki/Representational_state_transfer) com os endpoints abaixo aceitando e retornando `JSON`.

#### Listagem (GET /products)

Listagem de todos os produtos.

##### Argumentos

N/A

##### Formato da Resposta

- Produtos: Array de Produto

Produto:

- id: [string] Id do produto.
- name: [string] Nome do produto.
- price: [number] Preço do produto.
- image_url: [string] Url para imagem do produto.

##### Exemplo

```json
[
  {
    "id": 1,
    "name": "Product Foo",
    "price": "99.90",
    "image_url": "/media/865eccc4-b983-4d09-ae0a-08baaba84d79.jpg"
  },
  {
    "id": 2,
    "name": "Product bar",
    "price": "2.99",
    "image_url": "/media/865eccc4-b983-4d09-ae0a-08baaba84d80.jpg"
  }
]
```

#### Adição (POST /products)

Adição de um produto.

##### Argumentos

###### Body (Form Data em função do upload de imagens)

- Produto

Produto:

- name: [string] Nome do produto
- price: [number] Preço do produto
- image: [file upload] File upload da imagem do produto

##### Formato da Resposta

##### Exemplo

Sucesso 201

```json
{
  "id": 123,
  "name": "Product Foo Bar",
  "price": "10.10",
  "image_url": "/media/865eccc4-b983-4d09-ae0a-08baaba84d79.jpg"
}
```

Erro 400

```json
{
  "message": "Some error message"
}
```

#### Remoção (DELETE /products/<product_id>)

##### Argumentos

###### Query Parameter

product_id: Id do produto a ser deletado

##### Formato da Resposta

Sucesso 204

```
<vazio>
```

Erro 400

```json
{
  "message": "Some error message"
}
```

### Entregas esperadas

- [ ] Reproduzir fielmente a documentação da API;
- [ ] Permitir o usuário listar os produtos utilizando a API;
- [ ] Permitir o usuário adicionar novos produtos utilizando a API; e
- [ ] Permitir o usuário deletar produtos utilizando a API.

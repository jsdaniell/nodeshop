# Node Shop
Demonstração de uso dos principais recursos e usos do framework Express executando em ambiente Node.js, foram utilizados diversos pacotes instalados via **npm**.

## Dependências do Projeto

```javascript
  "devDependencies": {
    "nodemon": "^1.19.1"
  },
  "dependencies": {
    "@types/express": "^4.16.1",
    "body-parser": "^1.19.0",
    "ejs": "^2.6.1",
    "express": "^4.17.1",
    "express-handlebars": "^3.1.0",
    "pug": "^2.0.3"
  }
  ```

### As dependências acima se referem as seguintes competências:

- Implementação do servidor construída em cima do framework Express.js (express)
- Recursos para melhor manipulação do corpo das requisições (body-parser)
- Template engine para criação de páginas web dinâmicas (ejs, pug, express-handlebars)

## Instalação da Aplicação

Toda a instalação pode ser feita através da clonagem do projeto com a ferramenta **Git** via linha de comando no terminal, após a clonagem do projeto, pode-se certificar que as dependências estão devidamente instaladas com o comando `npm install` na pasta raiz do projeto.

## Mais Informações

**→** Foram utilziados layouts para implementação da view, visando o diminuimento da redundância no código, essas podem ser localizadas na pasta `views/layout/`.

**→** Na aplicação foi implementada arquitetura MVC para fins de organização do projeto, dissociando a `view` das regras de negócio da aplicação.

### Exemplo da Aplicação de Rotas (**Model**)

**→** A organização de rotas foi feita de modo que cada conjunto de middleware responsável por uma página, capturando seus métodos POST ou GET, fossem implementados em um arquivo, assim outras páginas tem seu próprio arquivo de middlewares e suas responsabilidades. Abaixo separei o exemplo de arquivo dentre qual todos os middlewares pertencem as tarefas de administração:

```javascript
const path = require('path');

const express = require('express');

const rootDir = require('../utils/path')

const router = express.Router();

const products = [];

router.get('/add-product', (req, res) => {

    res.render('add-product', {pageTitle: 'Add Product', path:'/admin/add-product'})

})

router.post('/add-product', (req, res) => {

    products.push({title: req.body.title})

    res.redirect('/');
})

exports.router = router;
exports.products = products;
```

### Sobre a View (**View**)

**→** Visto que essa aplicação não utiliza nenhuma stack especifíca, para a criação de páginas dinâmicas, utilizei uma template engine mais conhecida como "jade" ou "pug" onde essa dinamização é feita através de placeholders, utilizando os dados processados pelo servidor. Sua sintaxe é bastante diferente do HTML tradicional, porém se apresenta de forma fácil, conta ainda com a possibilidade de implementar lógica de negócio na view, e sua estrutura de escopos é feita via identação.

**→** Também foi utilizada a engine "ejs" para os mesmos fins, porém sua sintaxe é mais parecida com o HTML tradicional. Essa porém precisa de algumas implementações adicionais para que sejam criados layouts, o que já acontece de forma "natural" com a utilização do "pug".

Abaixo um exemplo da implementação de uma página utilizando "pug" e o layout criado para evitar redundância de códigos:

**→** Layout

```javascript
<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible", content="ie=edge")
        title #{pageTitle}
        link(rel="stylesheet" href="/css/main.css")
        block styles
    body
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a(href="/", class=(path === '/' ? 'active' : '')) Shop
                    li.main-header__item
                        a(href="/admin/add-product", class=(path === '/admin/add-product' ? 'active' : '')) Add Product
        block content
```

**→** Página de acesso (Shop)

```javascript
extends layouts/main-layout.pug

block styles
    link(rel="stylesheet", href="/css/forms.css")
    link(rel="stylesheet", href="/css/product.css")
block content
    main
        form.product-form(action="/admin/add-product", method="POST")
            .form-control
                label(for="title") Title
                input(type="text", name="title")#title
            button.btn(type="submit") Add Product
```

## Aplicação

[logo]: seplag_aposentadoria_pagina_principal.png?raw=true "Página Principal"

Aplicação construída para gerenciamento de benefícios de aposentadoria de servidores. Por meio dela é possível incluir a documentação necessária e realizar a tramitação do processo.

### Uso

Todo servidor possui um benefício de aposentadoria associado a ele(a), podendo atualizar a documentação ou tramitação de tal benefício acessando o botão "Atualizar" presente do lado daquele servidor desejado.

Na página de gestão do benefício é possível visualizar informações básicas do servidor e também, utilizando as abas adequadas, incluir novos documentos ou tramitar o processo para o próximo setor competente.

## Tecnologias

Foram empregadas tecnologias _open source_ visando a construção de uma aplicação minimamente robusta e estável.

Usando _containers_, é possível subir tanto o _frontend_ quanto o _backend_ em ambientes uniformes e iguais àqueles que serão encontrados no ambiente produtivo.

O backend utiliza tecnologia responsiva visando a sustentação de grande volume de chamadas a Web API (_Reactor_, um projeto da Pivotal). Ainda foi utilizado o framework _Spring Boot_, reconhecido no emprego de importantes soluções no mercado, para receber as requisições recebidas de clientes externos, como a aplicação de _frontend_. A programação utiza linguagem de programação _Java_, também reconhecida como sólida tecnologia de mercado.

A experiência de usuário é proporcionada pelo _framework_ _Angular_ em sua mais recente versão (então 8.x). Dessa forma, abrem-se as oportunidades para para construção de uma aplicação rica e rápida.

Por fim, mas não menos importante, está a base de dados. A aplicação foi construída usando banco de dados **H2**, um banco de dados leve e suficientemente seguro para armazenar as informações destinadas a esta primeira versão. Por utilizar abstração de banco de dados, é possível migrar e substituí-lo por solução mais adequada a necessidades posteriormente.

### Referências tecnológicas

- Java <openjdk 11>
- Angular <8.x>
- Spring Boot com Reactor <2.2.0.RELEASE>
- Banco de dados H2
- Docker <19.x> e Docker Compose <config file 3.7>

## Execução

A aplicação suporta Docker e, portanto uma imagem pode ser gerada. O processo de build pode ser feito utilizando o comando:

_(frontend)_

`docker build . -t site:1.0.0`

_(backend)_

`docker build . -t service:1.0.0`

Já para executar individualmente os containers, pode-se utilizar o comando:

_(frontend; no endereço **http://localhost:3000/**)_

`docker run -it -p 3000:80 --rm site:1.0.0`

_(backend; no endereço **http://localhost:8080/**)_

`docker run -it -p 8080:8080 --rm service:1.0.0`

As aplicações também podem ser executadas juntas utilizando o _Docker Compose_ com o comando dado na raiz do repositório:

`docker-compose up --build`

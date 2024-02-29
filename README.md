# Entidades

## Pet

- id
- name
- description?
- born_at
- weight
- type [dog, cat]
- organization_id
<!-- - energy [very low, low, medium, high, very high] -->
<!-- - environment [indoor, outdoor, both, spacious] -->
<!-- - independence_level [low, medium, high] -->

## Organization

- id
- name
- responsible_name
- email
- password_hash
- latitude
- longitude
- whatsApp

### Regras da aplicação

- [ ] Deve ser possível cadastrar um pet <!-- create-pet -->
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade <!-- list-pets -->
- [ ] Deve ser possível filtrar pets por suas características <!-- list-pets -->
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [ ] Deve ser possível se cadastrar como uma ORG
- [ ] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada
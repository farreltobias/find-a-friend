# Entidades

## Pet

- id
- name
- description?
- born_at
- weight
- type [dog, cat]
- energy [very low, low, medium, high, very high]
- environment [indoor, outdoor, spacious]
- independence [low, medium, high]
- org_id

## Organization

- id
- name
- responsible_name
- email
- password_hash
- latitude
- 
- longitude
- whatsApp

### Regras da aplicação

- [x] Deve ser possível cadastrar um pet <!-- create-pet -->
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade <!-- list-pets -->
- [ ] Deve ser possível filtrar pets por suas características <!-- list-pets -->
- [ ] Deve ser possível visualizar detalhes de um pet para adoção <!-- get-pet-details -->
- [ ] Deve ser possível se cadastrar como uma ORG <!-- register -->
- [ ] Deve ser possível realizar login como uma ORG <!-- authenticate -->

### Regras de negócio

- [ ] Para listar os pets, obrigatoriamente precisamos informar a **cidade**
- [ ] Uma ORG precisa ter um **endereço** e um número de **WhatsApp**
- [x] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como **admin**, ela precisa estar **logada**
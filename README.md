## FinAPI - Finance API

### Requisitos

- [X] Deve ser possível criar uma conta
- [X] Deve ser possível buscar o extrato bancário do cliente
- [X] Deve ser possível realizar o depósito
- [X] Deve ser possível realizar o saque
- [X] Deve ser possível buscar o extrato bancário do cliente por data
- [X] Deve ser possível atualizar os dados da conta do cliente
- [X] Deve ser possível obter dados da conta do cliente
- [X] Deve ser possível deletar a conta do cliente
- [] Deve ser possível retornar o balance

---

## Regras de negócio

- [X] Não deve ser possível cadastrar uma conta com CPF já existente.
- [X] Não deve ser possível realizar um deposito em uma conta inexistente.
- [X] Não deve ser possível buscar extrato de uma conta inexistente.
- [X] Não deve ser possível realizar um saque em uma conta inexistente.
- [X] Não deve ser possível realizar um saque com valor maior do que o saldo da conta.
- [X] Não deve ser possível excluir uma conta inexistente.
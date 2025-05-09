const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.header

  const customer = customers.find((customer) => customer.cpf === cpf)

  if (!customer) {
    return res.status(400).json({ error: "Customer not found" });
  }

  req.customer = customer

  return next()
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount
    } else {
      return acc - operation.amount
    }
  }, 0)

  return balance
}

app.post("/account", (req, res) => {
  const { cpf, name } = req.body

  if (!cpf || !name) {
    return res.status(400).json({ error: "CPF e nome são obrigatórios" });
  }

  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)

  if (customerAlreadyExists) {
    return res.status(400).json({ error: "CPF já cadastrado" });
  }

  const account = {
    cpf,
    name,
    id: uuid(),
    statement: []
  }

  customers.push(account)

  return res.status(201).send()
});

app.get("/statement/:cpf", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req

  return res.json(customer.statement)
})

app.post("/deposit", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req

  const { amount } = req.body

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  customer.statement.push({
    type: 'credit',
    amount,
    created_at: new Date(),
    description: 'Depósito'
  })

  return res.status(201).send()
})

app.post("/withdraw", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req

  const { amount } = req.body

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  const balance = getBalance(customer.statement)

  if (balance < amount) {
    return res.status(400).json({ error: "Insufficient funds" });
  }

  customer.statement.push({
    type: 'debit',
    amount,
    created_at: new Date(),
    description: 'Saque'
  })

  return res.status(201).send()
})

app.listen(3000);


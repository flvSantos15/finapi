const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

/**
 * cpf - string
 * name - string
 * id - uuid
 * statement - []
*/
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

app.get("/statement/:cpf", (req, res) => {
  const { cpf } = req.header

  const customer = customers.find((customer) => customer.cpf === cpf)

  if (!customer) {
    return res.status(400).json({ error: "Customer not found" });
  }

  return res.json(customer.statement)
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


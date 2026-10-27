export function newUser() {
  const id = `${Date.now()}-${Cypress._.random(100000, 999999)}`;
  return {
    name: "Aluno Teste",
    email: `tcc-${id}@example.com`,
    password: `Tcc!${id}`,
    title: "Mr",
    birth_date: "15",
    birth_month: "6",
    birth_year: "1995",
    firstname: "Aluno",
    lastname: "Teste",
    company: "Projeto TCC",
    address1: "Rua de Teste 123",
    address2: "Apartamento 10",
    country: "Canada",
    state: "Ontario",
    city: "Toronto",
    zipcode: "M5V 1A1",
    mobile_number: "4165550123",
  };
}

const jsonBody = (body) => (typeof body === "string" ? JSON.parse(body) : body);

export function createUser(user) {
  return cy
    .request({
      method: "POST",
      url: "/api/createAccount",
      form: true,
      body: user,
      log: false,
    })
    .then(({ body }) =>
      expect(jsonBody(body).responseCode, "conta de pré-condição criada").to.eq(
        201,
      ),
    );
}

export function removeUser(user) {
  return cy
    .request({
      method: "DELETE",
      url: "/api/deleteAccount",
      form: true,
      log: false,
      body: { email: user.email, password: user.password },
    })
    .then(({ body }) => {
      // 404 é esperado quando o próprio cenário já excluiu a conta.
      expect(jsonBody(body).responseCode, "limpeza da conta").to.be.oneOf([
        200, 404,
      ]);
    });
}

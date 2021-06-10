context("ToDo", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  it("should pick a date", () => {
    cy.get("#minicalendar-input").parent().find("button").click()

    cy.get(".MuiPickersCalendar-week").should("be.visible")
  })

  it("should render to do list", () => {
    cy.intercept(
      {
        method: "GET",
        url: "**/todos/*",
      },
      {
        statusCode: 200,
        body: [
          {
            title: "this is a test",
            dueDate: "2021-06-07T18:18:02.856Z",
            done: false,
            id: "97aeec24-62d9-483e-a59e-1d36def389e2",
          },
        ],
        headers: { "access-control-allow-origin": "*" },
        delayMs: 500,
      }
    ).as("getToDos")

    cy.get('[data-test-id="to-do-list"]').find('[data-test-id="list-item"]').its("length").should("eq", 1)
  })
})

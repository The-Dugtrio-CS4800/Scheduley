beforeEach(() => {
  cy.visit('http://localhost:3000/new')
});

describe('new meeting page submits date ranges', () => {
  it('clicks submit button', () => {
    cy.get('[data-cy="submit"]').click()
    cy.url().should('include', '/meeting')
  })
  it('chooses new range', () => {
    cy.get('[aria-label="Choose Sunday October 29 of 2023"] > .sd').click()
    cy.get('[aria-label="Choose Tuesday October 31 of 2023"] > .sd').click()
    cy.get('.rmdp-calendar')
  })
})




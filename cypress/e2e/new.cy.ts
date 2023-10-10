import {DateObject} from "react-multi-date-picker";

const todayDate = new DateObject()
const nextDay = new DateObject()
nextDay.day += 1
const oneWeek = new DateObject()
oneWeek.day += 6


function formatDateSelector(date): string {
  return '[aria-label="Choose ' + date.format('dddd MMMM DD of YYYY') + '"]'
}


beforeEach(() => {
  cy.visit('http://localhost:3000/new')
});

describe('new meeting page date picker and submit button', () => {

  it('finds default range', () => {
    cy.get(formatDateSelector(todayDate)).should('have.attr', 'tabindex', '0')
    if (todayDate.day > oneWeek.day) {
      cy.get('.rmdp-right').click()
    }
    cy.get(formatDateSelector(oneWeek)).should('have.attr', 'tabindex', '0')
  })

  it('deselect default range', () => {
    cy.get(formatDateSelector(todayDate)).click()
    cy.get(formatDateSelector(todayDate)).should('have.attr', 'tabindex', '0')
    if (todayDate.day > oneWeek.day) {
      cy.get('.rmdp-right').click()
    }
    cy.get(formatDateSelector(oneWeek)).should('have.attr', 'tabindex', '-1')
  })

  it('select new range', () => {
    if (todayDate.day > nextDay.day) {
      cy.get('.rmdp-right').click()
    }
    cy.get(formatDateSelector(nextDay)).click()
    cy.get(formatDateSelector(nextDay)).should('have.attr', 'tabindex', '0')
    if (nextDay.day > oneWeek.day) {
      cy.get('.rmdp-right').click()
    }
    cy.get(formatDateSelector(oneWeek)).click().should('have.attr', 'tabindex', '0')
  })

  it('clicks submit button', () => {
    cy.get('[data-cy="submit"]').click()
    cy.url().should('include', '/meeting')
  })
})




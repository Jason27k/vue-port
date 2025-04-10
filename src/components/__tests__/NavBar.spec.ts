import NavBar from '@/components/NavBar.vue'

describe('NavBar', () => {
  it('should have a name', () => {
    cy.mount(NavBar)
    cy.get('[data-cy=name]').should('exist')
  })

  it('should have a theme switch', () => {
    cy.mount(NavBar)
    cy.get('[data-cy=theme-switch]').should('exist')
  })

  it('should label for the switch', () => {
    cy.mount(NavBar)
    cy.get('[data-cy=theme-label]').should('exist')
  })

  it('should have a theme button', () => {
    cy.mount(NavBar)
    cy.get('[data-cy=theme-button]').should('exist')
  })
})

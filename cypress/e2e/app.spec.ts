// https://on.cypress.io/api

describe('<App /> Initial Theme State', () => {
  beforeEach(() => {
    document.documentElement.className = ''
  })

  it("should apply 'dark' class to html on load when localStorage theme is 'dark'", () => {
    cy.visit('/')

    cy.window().then((win) => {
      win.localStorage.setItem('theme', 'dark')
      cy.log('Set localStorage: theme=dark')
    })

    cy.reload()
    cy.log('Reloaded page')

    cy.log('Mounted NavBar component')
    cy.get('html').should('have.class', 'dark')
    cy.log('Verified <html> has class "dark"')
  })

  it("should apply 'dark' class to html on load when localStorage is unset and prefers-color-scheme is dark", () => {
    cy.visit('/')

    cy.window().then((win) => {
      win.localStorage.removeItem('theme')
      cy.log('Removed localStorage theme')

      cy.stub(win, 'matchMedia')
        .withArgs('(prefers-color-scheme: dark)')
        .returns({
          matches: true,
          media: '(prefers-color-scheme: dark)',
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
          onchange: null,
        })
      cy.log('Stubbed matchMedia to return dark preference')
    })

    cy.reload()
    cy.log('Reloaded page')

    cy.log('Mounted NavBar component')
    cy.get('html').should('have.class', 'dark')
    cy.log('Verified <html> has class "dark"')
  })

  it("should NOT apply 'dark' class to html on load when localStorage theme is set to light", () => {
    cy.visit('/')

    cy.window().then((win) => {
      win.localStorage.setItem('theme', 'light')
      cy.log('Set localStorage: theme=light')
    })

    cy.reload()
    cy.log('Reloaded page')

    cy.log('Mounted NavBar component')
    cy.get('html').should('not.have.class', 'dark')
    cy.log('Verified <html> does NOT have class "dark"')
  })

  it('should toggle theme on switch click', () => {
    cy.visit('/')

    cy.window().then((win) => {
      win.localStorage.setItem('theme', 'light')
      cy.log('Removed localStorage theme')
    })

    cy.reload()
    cy.log('Reloaded page')

    cy.log('Mounted NavBar component')
    cy.get('html').should('not.have.class', 'dark')
    cy.log('Verified <html> does not have class "dark"')

    cy.get('[data-cy="theme-switch"]').click()
    cy.log('Clicked theme toggle')

    cy.get('html').should('have.class', 'dark')
    cy.log('Verified <html> does have class "dark" after click')
    cy.window().then((win) => {
      const theme = win.localStorage.getItem('theme')
      expect(theme).to.equal('dark')
      cy.log(`Verified localStorage theme is set to ${theme}`)
    })

    cy.get('[data-cy="theme-switch"]').click()
    cy.log('Clicked theme toggle again')

    cy.get('html').should('not.have.class', 'dark')
    cy.log('Verified <html> does not have class "dark" after click')
  })
})

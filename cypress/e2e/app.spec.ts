// https://on.cypress.io/api

describe('<App /> Theme Handling', () => {
  it("should apply 'dark' class to html on load when localStorage theme is 'dark'", () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('theme', 'dark')
      },
    })
    cy.get('html').should('have.class', 'dark')
  })

  it("should apply 'dark' class to html on load when localStorage is unset and prefers-color-scheme is dark", () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.removeItem('theme')
        cy.stub(win, 'matchMedia').callsFake((query: string) => {
          return {
            matches: query === '(prefers-color-scheme: dark)',
            media: query,
            onchange: null,
            addEventListener: cy.stub(),
            removeEventListener: cy.stub(),
            addListener: cy.stub(),
            removeListener: cy.stub(),
            dispatchEvent: cy.stub().returns(false),
          }
        })
      },
    })
    cy.get('html').should('have.class', 'dark')
  })

  it("should NOT apply 'dark' class to html on load when localStorage theme is set to light", () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('theme', 'light')
      },
    })
    cy.get('html').should('not.have.class', 'dark')
  })

  it("should NOT apply 'dark' class to html on load when localStorage is unset and prefers-color-scheme is light", () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.removeItem('theme')
        cy.stub(win, 'matchMedia').callsFake((query: string) => {
          return {
            matches: query === '(prefers-color-scheme: light)',
            media: query,
            onchange: null,
            addEventListener: cy.stub(),
            removeEventListener: cy.stub(),
            addListener: cy.stub(),
            removeListener: cy.stub(),
            dispatchEvent: cy.stub().returns(false),
          }
        })
      },
    })
    cy.get('html').should('not.have.class', 'dark')
  })

  it('should toggle theme on switch click and update localStorage', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('theme', 'light')
      },
    })

    cy.get('html').should('not.have.class', 'dark')
    cy.window().its('localStorage.theme').should('eq', 'light')

    cy.get('[data-cy="theme-switch"]').click()
    cy.get('html').should('have.class', 'dark')
    cy.window().its('localStorage.theme').should('eq', 'dark')

    cy.get('[data-cy="theme-switch"]').click()
    cy.get('html').should('not.have.class', 'dark')
    cy.window().its('localStorage.theme').should('eq', 'light')
  })

  it('should toggle theme on button click and update localStorage', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('theme', 'light')
      },
    })

    cy.get('html').should('not.have.class', 'dark')
    cy.window().its('localStorage.theme').should('eq', 'light')

    cy.get('[data-cy="theme-button"]').click()
    cy.get('html').should('have.class', 'dark')
    cy.window().its('localStorage.theme').should('eq', 'dark')

    cy.get('[data-cy="theme-button"]').click()
    cy.get('html').should('not.have.class', 'dark')
    cy.window().its('localStorage.theme').should('eq', 'light')
  })
})

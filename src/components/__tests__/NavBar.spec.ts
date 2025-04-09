import NavBar from '@/components/NavBar.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { routes } from '@/router'
import { createApp } from 'vue'

describe('<NavBar /> Initial Theme State', () => {
  beforeEach(() => {
    document.documentElement.className = ''
  })

  it("should apply 'dark' class to html on load when localStorage theme is 'dark'", () => {
    const router = createRouter({
      routes: routes,
      history: createMemoryHistory(),
    })

    const app = createApp({})
    app.use(router)

    cy.wrap(router.push('/'))
    cy.window().then((win) => {
      win.localStorage.setItem('theme', 'dark')
      cy.log('Set localStorage: theme=dark')
    })

    cy.mount(NavBar, {
      global: {
        plugins: [router],
      },
    })
    cy.log('Mounted NavBar component')
    cy.get('html').should('have.class', 'dark')
    cy.log('Verified <html> has class "dark"')
  })

  it("should apply 'dark' class to html on load when localStorage is unset and prefers-color-scheme is dark", () => {
    const router = createRouter({
      routes: routes,
      history: createMemoryHistory(),
    })

    const app = createApp({})
    app.use(router)

    cy.wrap(router.push('/'))
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

    cy.mount(NavBar, {
      global: {
        plugins: [router],
      },
    })
    cy.log('Mounted NavBar component')
    cy.get('html').should('have.class', 'dark')
    cy.log('Verified <html> has class "dark"')
  })

  it("should NOT apply 'dark' class to html on load when localStorage theme is 'light'", () => {
    const router = createRouter({
      routes: routes,
      history: createMemoryHistory(),
    })

    const app = createApp({})
    app.use(router)

    cy.wrap(router.push('/'))
    cy.window().then((win) => {
      win.localStorage.setItem('theme', 'light')
      cy.log('Set localStorage: theme=light')
    })

    cy.mount(NavBar, {
      global: {
        plugins: [router],
      },
    })
    cy.log('Mounted NavBar component')
    cy.get('html').should('not.have.class', 'dark')
    cy.log('Verified <html> does NOT have class "dark"')
  })

  Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes("Cannot read properties of undefined (reading 'app')")) {
      return false
    }
    return true
  })
})

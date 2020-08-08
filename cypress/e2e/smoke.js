describe('homepage', () => {
    it('works', () => {
      cy.visit('/')
      cy.wait(500) // wait for rehydration
    })
  })

describe('graphql playground', () => {
    it('works', () => {
      cy.visit('/.netlify/functions/graphql')
      cy.wait(500) // wait for rehydration
    })
})


describe('auth pages', () => {
  it('endpoint', () => {
    cy.visit('/.netlify/functions/auth', {
      auth: {
        username: 'aym@man.com',
        password: 'password'
      }
    })
  })
})
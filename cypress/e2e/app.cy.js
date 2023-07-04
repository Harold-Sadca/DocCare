// beforeEach(() => {
//   cy.exec('npm run seeds')
// })

describe('Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000')
  })
})
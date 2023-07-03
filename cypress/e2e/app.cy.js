

describe('Home To Patient Registration', () => {
  it('Should Navigate To Patient Register', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/home')
 
    // Find a link with an href attribute containing "about" and click it
    cy.get('h1').contains('Connect with top Rated Doctors')
    cy.get('a[href*="/patient/login"]').eq(0).click()
    cy.get('h3').contains('Explore the future with us.')
    cy.get('a[href*="/patient/register"]').eq(0).click()
    cy.get('input').eq(0).type('Harold')
    cy.get('input').eq(1).type('harold@gmail.com')
    cy.get('input').eq(2).type('password')
    cy.get('input').eq(3).type('+44 20 1234 5678')
    cy.get('input').eq(4).type('123 Main Street')
    cy.get('input').eq(5).type('1994-08-04')
    cy.get('input').eq(6).type('1')
    cy.get('input').eq(9).type('AB-')
    cy.get('textarea').eq(0).type('Manual Labour')
    cy.get('textarea').eq(1).type('Whiskey Does Help')
    cy.get('textarea').eq(2).type('I Dont Know A Broken Bone I Guess')
    cy.get('textarea').eq(3).type('None')
    cy.get('button').eq(0).click()
  })
})
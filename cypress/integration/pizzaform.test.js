// describe('My first test', function () {
//     it('clicks on element', function() {
//         cy.visit('https://example.cypress.io')

//         cy.contains('type').click()

//             cy.url()
//             .should('include', '/commands/actions')

//         cy.get('.action-email')
//             .type('fake@email.com')
//             .should('have.value', 'fake@email.com')
//     })
// })

describe('navigate to form', function(){
    it('clicks on pizza link', function(){
        cy.visit('http://localhost:3000/')

        cy.contains('Build').click()
    })
})

describe('Order check', function(){
    it('fills out and submits form', function(){

        cy.get('[name="name"]').click().type('Dwaine')
        cy.contains('Phone').click().type('2125551234')
        cy.contains('Pepperoni').click()
        cy.contains('Sausage').click()
        cy.contains('Add').click()
        cy.pause()
        cy.contains('Name').click().type('Leah')
        cy.contains('Phone').click().type('3475551234')
        cy.contains('Mushrooms').click()
        cy.get('[data-cy=instructions]').click().type('none');
        cy.contains('Add').click()
    })
})
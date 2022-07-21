describe('fuego-ui: CheckboxCmp component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=checkboxcmp--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to CheckboxCmp!');
    });
});

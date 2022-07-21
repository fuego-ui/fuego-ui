describe('fuego-ui: field component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=field--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to field!');
    });
});

describe('fuego-ui: FieldFix component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=fieldfix--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to FieldFix!');
    });
});

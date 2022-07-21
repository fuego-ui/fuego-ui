describe('fuego-ui: SpinnerCmp component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=spinnercmp--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to SpinnerCmp!');
    });
});

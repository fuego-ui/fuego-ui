describe('fuego-ui: thirdPartyLink component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=thirdpartylink--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to thirdPartyLink!');
    });
});

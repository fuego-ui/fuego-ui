describe('fuego-ui: TabComponent component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tabcomponent--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TabComponent!');
    });
});

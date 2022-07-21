describe('fuego-ui: Draggable component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=draggable--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Draggable!');
    });
});

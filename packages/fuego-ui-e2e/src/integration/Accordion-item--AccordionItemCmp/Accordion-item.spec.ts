describe('fuego-ui: AccordionItemCmp component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=accordionitemcmp--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to AccordionItemCmp!');
    });
});

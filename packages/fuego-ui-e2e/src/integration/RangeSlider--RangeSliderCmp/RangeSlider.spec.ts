describe('fuego-ui: RangeSliderCmp component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=rangeslidercmp--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to RangeSliderCmp!');
    });
});

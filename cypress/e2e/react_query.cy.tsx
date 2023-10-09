// To run: 
// First time: npx cypress open
//    Afterwards: npm run cypress
// Launch "npm run dev" in a different terminal

describe('React Query Tests', () => {
  it('Data fetched by react query:', () => {
    cy.request('http://localhost:3000/api/react_query_test').then((response) => {
      // Verify the API response
      expect(response.status).to.eq(200); // Check if the status code is 200 OK
      expect(response.body).to.have.length.greaterThan(0); // Check if response body is an array with items

      // Check if the expected items are present in the response body
      expect(response.body.some(item => item.title === 'tteokbokki')).to.be.true;
      expect(response.body.some(item => item.title === 'laksa')).to.be.true;
    });
  });
});
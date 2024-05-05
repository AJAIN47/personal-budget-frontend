describe('Expense App', () => {
  before(() => {
    cy.eyesOpen({
      appName: 'personal-budget',
      apiKey: 'Epwm3p103Nefx63sGMeSql0NjmoVpCIV6SLFJro0fU1071g110',
    });
  });

  it('should add an expense for the selected month and budget', () => {
    cy.visit('/login');
    cy.get('#username').type('alishjain');
    cy.get('#password').type('Ocean@01021995');
    cy.get('form').submit();

    cy.url().should('include', '/dashboard');
    cy.contains('User Dashboard').should('be.visible');

    cy.contains('Expenses').click();
    cy.contains('Add Expense').click();

    const selectedMonth = 'January';
    cy.get('#selectedMonth').select(selectedMonth);
    cy.get('#selectedMonth').should('have.value', selectedMonth);
    cy.get('#selectedMonth').trigger('change');

    const selectedBudget = 'Groceries';
    cy.get('#selectedBudget').select(selectedBudget);
    cy.get('#selectedBudget').should('have.value', selectedBudget);

    const expenseAmount = '100';
    cy.get('#expense').type(expenseAmount);
    cy.get('#expense').should('have.value', '0100');

    cy.eyesCheckWindow({
      tag: 'Add Expense',
    });

    cy.get('form').submit();
  });

  after(() => {
    cy.eyesClose();
  });
});

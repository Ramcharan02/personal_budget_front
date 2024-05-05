describe("Login feature testing", () => {
    it("should display homepage", () => {
      cy.visit("/");
      cy.contains(
        "Please Login/Create account to view your dashboard"
      ).should("exist");
    });
  
    it("Should open login page", () => {
      cy.visit("/");
      cy.get(".login").click();
      cy.wait(500);
      cy.contains("Please sign in").should("exist");
    });
  
    const executeLogin = () => {
      cy.visit("/login");
      cy.contains("Please sign in").should("exist");
      cy.get("#email").type("ramcharanrc02@gmail.com");
      cy.get("#password").type("ramcharanRC1");
      cy.get(".signin").click();
      cy.wait(200);
    };
  
    it("Should be able to login using test credentials", () => {
      executeLogin();
      cy.contains("Dashboard").should("exist");
      cy.contains("Add Budget").should("exist");
      cy.contains("Add Expense").should("exist");
    });
  
    it("Once logged in should be able to logout", () => {
      executeLogin();
      cy.get(".logout").click();
      cy.wait(200);
      cy.contains("Please sign in").should("exist");
    });
  });
import Chance from 'chance';
const chance = new Chance();

describe('test end to end de thelp', function() {
    const identifiant = chance.first();
    const password = chance.hash({length: 6});

    it('Creation d\'un compte : ' + identifiant + ' ' + password, function() {
        cy.visit('https://thelp.adamdoursiev.com');
        cy.url().should('include', '/src/login.php');
        cy.wait(1000);
        cy.get('a[href="register.php"]').click();
        cy.wait(1000);
        cy.url().should('include', '/src/register.php');
        cy.get('input[id="inputUsername"]').type(identifiant);
        cy.wait(1000);
        cy.get('input[id="inputRegisPassword"]').type(password);
        cy.wait(1000);
        cy.get('input[id="inputConfirm_password"]').type(password);
        cy.wait(1000);
        cy.get('button[value="Valider"]').should('be.enabled').click();
        cy.url().should('include', '/src/login.php');
        cy.log('le compte ' + identifiant + ' a bien ete cree ' + password);
    });

    it('Login avec le compte : ' + identifiant + ' ' + password, function() {
        Cypress.Cookies.preserveOnce('PHPSESSID');
        cy.visit('https://thelp.adamdoursiev.com');
        cy.url().should('include', '/src/login.php');
        cy.wait(1000);
        cy.get('input[id="inputUsername"]').type(identifiant);
        cy.wait(1000);
        cy.get('input[id="inputPassword"]').type(password);
        cy.wait(1000);
        cy.get('button[value="Connexion"]').click();
        cy.wait(1000);
        cy.url().should('include', '/src/welcome.php');
        cy.log('le compte ' + identifiant + ' a reussi a se connect');
    });

    it('Generer une appreciation de bulletin', function() {
        Cypress.Cookies.preserveOnce('PHPSESSID');
        cy.url().should('include', '/src/welcome.php');
        cy.wait(1000);
        cy.get('input[name="prenom"]').type(chance.first());
        cy.wait(1000);
        cy.get('input[id="trimestre' + chance.integer({ min: 1, max: 3 }) + '"]').click({force: true});
        cy.wait(1000);
        cy.get('select').select(''+chance.integer({min: 1, max: 31}) + '');
        cy.wait(1000);
        cy.get('button[class="btn btn-primary mb-2"]').click();
        cy.url().should('include', '/src/welcome.php');
        cy.wait(20000);
    });

});

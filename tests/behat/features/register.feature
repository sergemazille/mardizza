Feature: User account creation
    In order to gain access to the useful features of the application
    As an anonymous visitor
    I need to be able to create an account

Scenario: Seeing the register link
    Given I am on "/"
    Then I should see "Créer mon compte"

Scenario: Seeing the register form
    Given I am on "/"
    Then I should see "Créer mon compte sur Mardizza!!!"

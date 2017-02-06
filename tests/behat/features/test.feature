Feature: Behat setup test
    In order to login in
    As a guest user
    I need to be able to see the login link

Scenario: Seeing the login link
    Given I am on "/"
    Then I should see "Log in"

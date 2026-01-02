Project Overview
This repository contains a sample Playwright functional test automation framework for web applications. The project demonstrates a clean structure, reusable fixtures, and reliable test patterns used in professional QA teams.

Goals
* Show a practical Playwright setup for web testing
* Demonstrate authenticated and unauthenticated test flows
* Keep tests readable, stable, and easy to maintain

Tech Stack
* Playwright Test
* JavaScript
* Node.js

Project Structure
* helpers
  Authentication fixture and shared test setup
* tests
  Functional test specs grouped by feature
* playwright.config.js
  Global configuration for browsers, reporters, and timeouts

Key Features
* Fixture-based authentication for logged-in scenarios
* Separate flows for public and secured pages
* Stable locators and clear assertions
* Parallel test execution
* HTML test reports

Sample Use Cases
* Login and session-based validation
* Public page access checks
* Authenticated user flows
* Basic regression coverage

How to Run
* Install dependencies with npm install
* Install browsers with npx playwright install
* Run tests with npx playwright test
* View report with npx playwright show-report

Who This Project Helps
* QA engineers learning Playwright
* Teams looking for a reference framework
* Reviewers assessing automation structure and quality

This project reflects real-world functional test automation practices.

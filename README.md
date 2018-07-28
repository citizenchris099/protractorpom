# Flywheel Automation Tests

## install & setup
1. clone a copy of the repo. 
2. _npm install_
3. _webdriver-manager update_
4. _webdriver-manager start_
5. Make sure you also have java installed
6. once all that is done you will want to fire up your you local copy of spectrum

## running tests
1. cd to the root level of flywheel-automation

2. desktop tests can be run using: 
   * ```npm run-script smoke_test_desktop -- <test area>```
   * ```npm run-script regression_test_desktop -- <test area>```

3. possible test areas to run are
   * tasks
   * sites
   * people
   * misc
   * role
   * and you can run all of them with 'all'

4. ex: ```npm run-scriptregression_test_desktop -- tasks```

5. mobile tests are run similarly to desktop
   * ```npm run-script smoke_test_mobile -- <test area>```
   * ```npm run-script regression_test_mobile -- <test area>```
6. as of this writing there are only basic & taks test areas for mobile


Feature('sendingMessage');

var assert = require('assert');

Scenario('send successful message', ({ I, contactPage}) => {
    contactPage.navigateToRequiredPage(contactPage.URL),
    I.see(contactPage.contactText);
    contactPage.fillName(contactPage.testName),
    contactPage.fillEmail(contactPage.testEmail),
    contactPage.fillWebsite(contactPage.testWebsite),
    contactPage.chooseCurrentDate(),
    contactPage.clickSubmit(),
    I.seeInCurrentUrl(contactPage.nextPage),
    contactPage.validateCreatedAccountDetails(
        contactPage.testName, 
        contactPage.testEmail, 
        contactPage.testWebsite
        )
});

Scenario('Verify that the field Name is required.', ({ I, contactPage}) => {
    contactPage.navigateToRequiredPage(contactPage.URL),
    I.see(contactPage.contactText);
    contactPage.fillName(" "),
    contactPage.fillEmail(contactPage.testEmail),
    contactPage.fillWebsite(contactPage.testWebsite),
    contactPage.chooseCurrentDate(),
    contactPage.clickSubmit(),
    I.dontSeeInCurrentUrl(contactPage.nextPage),
    I.see('Error!'),
    I.see(contactPage.errorMessage)
});

Scenario('Verify that the field Email is required.', async({ I, contactPage}) => {
    contactPage.navigateToRequiredPage(contactPage.URL),
    I.see(contactPage.contactText);
    contactPage.fillName(contactPage.testName),
    contactPage.fillEmail(" "),
    contactPage.fillWebsite(contactPage.testWebsite),
    contactPage.chooseCurrentDate(),
    contactPage.clickSubmit();
    I.dontSeeInCurrentUrl(contactPage.nextPage),

    await I.grabAttributeFrom(contactPage.fields.email, 'aria-required').then(function(val) { 
        I.say(val); 
        assert.equal(val, 'true');
    })
});

Scenario('Verify that the field website is required to be a URL.', async({ I, contactPage}) => {
    contactPage.navigateToRequiredPage(contactPage.URL),
    I.see(contactPage.contactText);
    contactPage.fillName(contactPage.testName),
    contactPage.fillEmail(contactPage.testEmail),
    contactPage.fillWebsite(contactPage.testName),
    contactPage.chooseCurrentDate(),
    contactPage.clickSubmit()
    I.dontSeeInCurrentUrl(contactPage.nextPage)

    await I.grabAttributeFrom(contactPage.fields.website, 'type').then(function(val) { 
        I.say(val); 
        assert.equal(val, 'url');
    })
});

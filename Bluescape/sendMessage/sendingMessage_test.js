Feature('sendingMessage');

var assert = require('assert');

Scenario('send successful message', ({ I, contactPage}) => {
    contactPage.navigateToRequiredPage(contactPage.URL),
    I.see('Contact');
    contactPage.fillName("test"),
    contactPage.fillEmail(contactPage.testEmail),
    contactPage.fillWebsite(contactPage.testWebsite),
    contactPage.chooseCurrentDate(),
    contactPage.clickSubmit()
    I.seeInCurrentUrl("contact-form-id=")
});

Scenario('Verify that the field Name is required.', ({ I, contactPage}) => {
    contactPage.navigateToRequiredPage(contactPage.URL),
    I.see('Contact');
    contactPage.fillName(" "),
    contactPage.fillEmail(contactPage.testEmail),
    contactPage.fillWebsite(contactPage.testWebsite),
    contactPage.chooseCurrentDate(),
    contactPage.clickSubmit(),
    I.see('Error!'),
    I.see('Name is required')
});

Scenario('Verify that the field Email is required.', async({ I, contactPage}) => {
    contactPage.navigateToRequiredPage(contactPage.URL),
    I.see('Contact');
    contactPage.fillName("test"),
    contactPage.fillEmail(" "),
    contactPage.fillWebsite(contactPage.testWebsite),
    contactPage.chooseCurrentDate(),
    contactPage.clickSubmit();
    I.dontSeeInCurrentUrl("contact-form-id=")

    await I.grabAttributeFrom(contactPage.fields.email, 'aria-required').then(function(val) { 
        I.say(val); 
        assert.equal(val, 'true');
    })
});

Scenario('Verify that the field website is required to be a URL.', async({ I, contactPage}) => {
    contactPage.navigateToRequiredPage(contactPage.URL),
    I.see('Contact');
    contactPage.fillName("test"),
    contactPage.fillEmail(contactPage.testEmail),
    contactPage.fillWebsite("test"),
    contactPage.chooseCurrentDate(),
    contactPage.clickSubmit()
    I.dontSeeInCurrentUrl("contact-form-id=")

    await I.grabAttributeFrom(contactPage.fields.website, 'type').then(function(val) { 
        I.say(val); 
        assert.equal(val, 'url');
    })
});

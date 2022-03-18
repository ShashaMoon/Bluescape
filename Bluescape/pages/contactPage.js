const { I } = inject();

module.exports = {

  // insert your locators and methods here
  URL: 'https://bluescapeqainterview.wordpress.com/contact/',
  fields : {
    name: 'input[id="g7-name"]',
    email: 'input[id="g7-email"]',
    website: 'input[id="g7-website"]',
    date: 'input[id="g7-date"]',
    currentdate: '.ui-datepicker-today'
  },
  submit: 'button[type=submit]',
  nextPage = 'contact-form-id=',

  //text
  contactText = 'Contact',
  errorMessage = 'Name is required',

  //test data
  testEmail: 'test@example.com',
  testWebsite: 'https://bluescapeqainterview.wordpress.com',
  testName = 'test',

  // introducing methods
  navigateToRequiredPage(URLData) {
    I.amOnPage(URLData);
  },

  fillName(name) {
    I.fillField(this.fields.name, name);
  },

  fillEmail(emailData) {
    I.fillField(this.fields.email, emailData);
  },

  fillWebsite(websiteData) {
    I.fillField(this.fields.website, websiteData);
  },

  chooseCurrentDate() {
    I.click(this.fields.date);
    I.click(this.fields.currentdate);
  },

  clickSubmit() {
    I.forceClick(this.submit);
  }
}

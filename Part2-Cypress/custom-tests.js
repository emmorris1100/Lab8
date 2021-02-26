describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  // Example 1
  it('Slider changes when volume input changes', () => {
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-slider').then(($el) => {
      expect($el).to.have.value(75);
    });
  });

  // Example 2
  it('Volume input changes when slider changes', () => {
    cy.get('#volume-slider').invoke('val', '33').trigger('input');
    cy.get('#volume-number').then(($el) => {
      expect($el).to.have.value(33);
    });
  });

  // Example 3
  it('Audio volume changes when slider changes', () => {
    cy.get('#volume-slider').invoke('val', '33').trigger('input');
    cy.get('#horn-sound').then(($el) => {
      expect($el).to.have.prop('volume', 0.33);
    });
  });

  // Test if the image and sound sources change when you select the party horn radio button
  it('Image and sound sources change when selecting party horn radio button', () => {
    cy.get('#radio-party-horn').check();
    cy.get('#horn-sound').then(($el) => {
      expect($el).to.have.attr('src', "./assets/media/audio/party-horn.mp3");
    });
    cy.get('#sound-image').then(($el) => {
      expect($el).to.have.attr('src', "./assets/media/images/party-horn.svg");
    });
  });

  // Test if the volume image changes when increasing volumes (you must test for all 3 cases)
  describe('Volume image changes when increasing volumes', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/');
      cy.get('#volume-slider').invoke('val', '0').trigger('input');
    });

    it('Level 1 when above 0%', () => {
      cy.get('#volume-slider').invoke('val', '1').trigger('input');
      cy.get('#volume-image').then(($el) => {
        expect($el).to.have.attr('src', './assets/media/icons/volume-level-1.svg');
      });
    });

    it('Level 2 when above 33%', () => {
      cy.get('#volume-slider').invoke('val', '34').trigger('input');
      cy.get('#volume-image').then(($el) => {
        expect($el).to.have.attr('src', './assets/media/icons/volume-level-2.svg');
      });
    });

    it('Level 3 when above 66%', () => {
      cy.get('#volume-slider').invoke('val', '67').trigger('input');
      cy.get('#volume-image').then(($el) => {
        expect($el).to.have.attr('src', './assets/media/icons/volume-level-3.svg');
      });
    });

  });

  // Test if the honk button is disabled when the textbox input is a empty or a non-number
  describe('Honk button is disabled', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/');
    });

    it('When textbox input is empty', () => {
      cy.get('#volume-number').clear();
      cy.get('#honk-btn').then(($el) => {
        expect($el).to.have.attr('disabled');
      });
    });

    it('When textbox input is a non-number', () => {
      cy.get('#volume-number').clear().type('NA');
      cy.get('#honk-btn').then(($el) => {
        expect($el).to.have.attr('disabled');
      });
    });
  });

  // Test if an error is shown when you type a number outside of the given range for the volume textbox input
  it('Error shown when number out of range entered', () => {
    cy.get('#volume-number').clear().type('101');
    cy.get('input:invalid').should('be.enabled');
  });

});

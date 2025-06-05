import { expect } from 'chai';
import gymMembership from '../../GymMembership'


describe('gymMembership', () => {

  describe('buyMembership()', () => {

    it('should return a message for valid membership purchase without discount', () => {
      const result = gymMembership.buyMembership('basic', 6, false);
      expect(result).to.equal('You bought a basic membership for 6 months. Total price: 300.00$.');
    });

    it('should return a message for valid membership purchase with discount', () => {
      const result = gymMembership.buyMembership('premium', 3, true);
      expect(result).to.equal('You bought a premium membership for 3 months. Total price: 216.00$.');
    });

    it('should throw error for invalid membership type', () => {
      expect(() => gymMembership.buyMembership('invalid', 6, false)).to.throw('Invalid membership type!');
    });

    it('should throw error for invalid number of months', () => {
      expect(() => gymMembership.buyMembership('basic', -1, false)).to.throw('Invalid number of months!');
      expect(() => gymMembership.buyMembership('premium', 14, false)).to.throw('Invalid number of months!');
    });

    it('should throw error for invalid discount parameter', () => {
      expect(() => gymMembership.buyMembership('basic', 6, 'yes')).to.throw('Invalid discount parameter!');
    });
  });

  describe('checkAccess()', () => {

    it('should grant access to gym for basic membership', () => {
      const result = gymMembership.checkAccess('basic', 'gym');
      expect(result).to.equal('Access granted to gym.');
    });

    it('should deny access to pool for basic membership', () => {
      const result = gymMembership.checkAccess('basic', 'pool');
      expect(result).to.equal('Access denied to pool.');
    });

    it('should grant access to gym and pool for premium membership', () => {
      const result = gymMembership.checkAccess('premium', 'gym');
      expect(result).to.equal('Access granted to gym.');

      const result2 = gymMembership.checkAccess('premium', 'pool');
      expect(result2).to.equal('Access granted to pool.');
    });

    it('should deny access to spa for premium membership', () => {
      const result = gymMembership.checkAccess('premium', 'spa');
      expect(result).to.equal('Access denied to spa.');
    });

    it('should grant access to all facilities for vip membership', () => {
      const result = gymMembership.checkAccess('vip', 'gym');
      expect(result).to.equal('Access granted to gym.');

      const result2 = gymMembership.checkAccess('vip', 'pool');
      expect(result2).to.equal('Access granted to pool.');

      const result3 = gymMembership.checkAccess('vip', 'spa');
      expect(result3).to.equal('Access granted to spa.');
    });

    it('should throw error for invalid membership type in checkAccess()', () => {
      expect(() => gymMembership.checkAccess('invalid', 'gym')).to.throw('Invalid membership type!');
    });

    it('should throw error for invalid facility in checkAccess()', () => {
      expect(() => gymMembership.checkAccess('basic', 'sauna')).to.throw('Invalid facility!');
    });
  });

  describe('buySupplements()', () => {

    it('should return a message for buying a shake supplement', () => {
      const result = gymMembership.buySupplements('shake');
      expect(result).to.equal('You bought a shake for 3.00$.');
    });

    it('should return a message for buying a bar supplement', () => {
      const result = gymMembership.buySupplements('bar');
      expect(result).to.equal('You bought a bar for 2.00$.');
    });

    it('should return a message for buying water supplement', () => {
      const result = gymMembership.buySupplements('water');
      expect(result).to.equal('You bought a water for 1.00$.');
    });

    it('should throw error for invalid supplement', () => {
      expect(() => gymMembership.buySupplements('invalid')).to.throw('Invalid supplement!');
    });
  });
});


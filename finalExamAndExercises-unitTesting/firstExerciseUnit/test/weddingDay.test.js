import { expect } from 'chai';
import weddingDay from '../weddingDay.js';

describe('WeddingDay', () => {
  describe('pickVenue', () => {
    it('Should be valid Input', () => {
      expect(() => weddingDay.pickVenue(1, 2, '')).to.throw('Invalid Information!');
      expect(() => weddingDay.pickVenue('', 2, 'Varna')).to.throw('Invalid Information!');
      expect(() => weddingDay.pickVenue(3, '', 'Varna')).to.throw('Invalid Information!');
      expect(() => weddingDay.pickVenue(undefined, undefined, undefined)).to.throw('Invalid Information!');
      expect(() => weddingDay.pickVenue({}, [], 2)).to.throw('Invalid Information!');
      expect(() => weddingDay.pickVenue(false, true, false)).to.throw('Invalid Information!');
      expect(() => weddingDay.pickVenue(-3, 4.56, -3, 42)).to.throw('Invalid Information!');
    });

    it('Input is different than Varna', () => {
      expect(() => weddingDay.pickVenue(150, 120, 'Sofia')).to.throw('The location of this venue is not in the correct area!');
      expect(() => weddingDay.pickVenue(150, 120, 'Pernik')).to.throw('The location of this venue is not in the correct area!');
    });

    it('Should be invalid guest and table', () => {
      expect(weddingDay.pickVenue(148, 120, 'Varna')).to.equal('This venue does not meet your requirements!');
      expect(weddingDay.pickVenue(150, 124, 'Varna')).to.equal('This venue does not meet your requirements!');
    });

    it ('Valid requarments' , () => {

        const capacity = 150
        const pricePerGuest = 120

        expect(weddingDay.pickVenue(capacity , pricePerGuest , `Varna`)).to.equal(`This venue meets the requirements, with capacity of ${capacity} guests and ${pricePerGuest}$ cover.`)

    })
  });
  describe ('otherSpendings' , ()=> {
    it ('Calculate the correct price without discount' , ()=> {
        expect(weddingDay.otherSpendings(['flowers'] , ['pictures'] , false)).to.equal(`You spend ${1200}$ for wedding decoration and photography!`)
        expect(weddingDay.otherSpendings(['Fabric drapes and curtains'] , ['video'] , false)).to.equal(`You spend ${1700}$ for wedding decoration and photography!`)
        expect(weddingDay.otherSpendings(['Fabric drapes and curtains','flowers' ] , ['video','pictures'] , false)).to.equal(`You spend ${2900}$ for wedding decoration and photography!`)
    })

    it ('Calculate the correct price with discount' , ()=> {
        expect(weddingDay.otherSpendings(['flowers'] , ['pictures'] , true)).to.equal(`You spend ${1200 * 0.85}$ for wedding decoration and photography with 15% discount!`)
        expect(weddingDay.otherSpendings(['Fabric drapes and curtains'] , ['video'] , true)).to.equal(`You spend ${1700*0.85}$ for wedding decoration and photography with 15% discount!`)
        expect(weddingDay.otherSpendings(['Fabric drapes and curtains','flowers' ] , ['video','pictures'] , true)).to.equal(`You spend ${2900 * 0.85}$ for wedding decoration and photography with 15% discount!`)
    })

    it('Test invalid inputs' , () => {
        expect(() => weddingDay.otherSpendings(1, 2, 2)).to.throw('Invalid Information!');
        expect(() => weddingDay.pickVenue(['dsad'], {}, true)).to.throw('Invalid Information!');
        expect(() => weddingDay.pickVenue({}, ['dsad'], false)).to.throw('Invalid Information!');
        expect(()=> weddingDay.otherSpendings(`asd` , -23 , undefined)).to.throw('Invalid Information!')
        expect(()=> weddingDay.otherSpendings(undefined , undefined , undefined)).to.throw('Invalid Information!')
        expect(()=> weddingDay.otherSpendings({} , {} , {})).to.throw('Invalid Information!')
        expect(()=> weddingDay.otherSpendings(NaN , 4.3 , true)).to.throw('Invalid Information!')
        expect(()=> weddingDay.otherSpendings(-4.5 , {name:`gosho`} , [])).to.throw('Invalid Information!')
    })

    describe (`tableDistribution` , () => {
        it('Should join other tables' , ()=> {
            expect(weddingDay.tableDistribution(50, 10)).to.equal(`There is only ${5} people on every table, you can join some tables.`)
            expect(weddingDay.tableDistribution(30, 10)).to.equal(`There is only ${3} people on every table, you can join some tables.`)
        })
        it ('If people on table is more or equal to 6' , ()=> {
            expect(weddingDay.tableDistribution(70, 10)).to.equal(`You have ${10} tables with ${7} guests on table.`)
            expect(weddingDay.tableDistribution(100, 10)).to.equal(`You have ${10} tables with ${10} guests on table.`)
            expect(weddingDay.tableDistribution(60, 10)).to.equal(`You have ${10} tables with ${6} guests on table.`)

        })
        it ('Invalid inputs' , ()=> {
            expect(() => weddingDay.tableDistribution(1, ``)).to.throw('Invalid Information!');
            expect(() => weddingDay.tableDistribution(``, 2)).to.throw('Invalid Information!');
            expect(() => weddingDay.tableDistribution(1, [])).to.throw('Invalid Information!');
            expect(() => weddingDay.tableDistribution([], 2)).to.throw('Invalid Information!');
            expect(() => weddingDay.tableDistribution({} , {})).to.throw('Invalid Information!');
        })
    })

  })
});
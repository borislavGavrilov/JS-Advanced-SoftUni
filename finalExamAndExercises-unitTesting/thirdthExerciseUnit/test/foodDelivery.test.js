import { expect } from "chai";
import foodDelivery from "../../foodDelivery.js";

describe("foodDelivery", function() { 

    describe("getCategory", function() { 
            
        it("Invalid Inputs", function() {
            expect(()=> foodDelivery.getCategory(``)).to.throw(`Invalid Category!`)
            expect(()=> foodDelivery.getCategory(`wqeqweewq`)).to.throw(`Invalid Category!`)
            expect(()=> foodDelivery.getCategory(2)).to.throw(`Invalid Category!`)
            expect(()=> foodDelivery.getCategory(undefined)).to.throw(`Invalid Category!`)
            expect(()=> foodDelivery.getCategory({})).to.throw(`Invalid Category!`)
            expect(()=> foodDelivery.getCategory([])).to.throw(`Invalid Category!`)
            expect(()=> foodDelivery.getCategory(NaN)).to.throw(`Invalid Category!`)
            expect(()=> foodDelivery.getCategory(-2)).to.throw(`Invalid Category!`)
            expect(()=> foodDelivery.getCategory(5.12)).to.throw(`Invalid Category!`)
            expect(()=> foodDelivery.getCategory(false)).to.throw(`Invalid Category!`)


        }); 


        it ('Valid Inputs' , ()=> {
            expect(foodDelivery.getCategory("Vegan")).to.equal(`Dishes that contain no animal products.`)
            expect(foodDelivery.getCategory("Vegetarian")).to.equal(`Dishes that contain no meat or fish.`)
            expect(foodDelivery.getCategory("Gluten-Free")).to.equal(`Dishes that contain no gluten.`)
            expect(foodDelivery.getCategory("All")).to.equal(`All available dishes.`)
        })

     }); 

     describe('addMenuItem' , ()=> {
        describe('addMenuItem' , ()=> {
            it ('Invalid input' , ()=> {
                expect(()=> foodDelivery.addMenuItem(`` , 10)).to.throw('Invalid Information!')
                expect(()=> foodDelivery.addMenuItem([{valuta}] , 9)).to.throw('Invalid Information!')
                expect(()=> foodDelivery.addMenuItem([], 10)).to.throw('Invalid Information!')
                expect(()=> foodDelivery.addMenuItem([{name:[] ,price:7 }] , 8)).to.throw('Invalid Information!')
                expect(()=> foodDelivery.addMenuItem(undefined , `kurec`)).to.throw('Invalid Information!')
                expect(()=> foodDelivery.addMenuItem([{name:`Name` ,boolenFlag:true }] , 11)).to.throw('Invalid Information!')
                expect(()=> foodDelivery.addMenuItem([{boolenFlag:false ,price:`kurec` }] , 3)).to.throw('Invalid Information!')
                expect(()=> foodDelivery.addMenuItem([{name:`frenchFood` ,price:7 }] , 3)).to.throw('Invalid Information!')
                expect(()=> foodDelivery.addMenuItem([{name:`frenchFood` ,price:7 }] , -3)).to.throw('Invalid Information!')
                expect(()=> foodDelivery.addMenuItem([{name:`frenchFood` ,price:7 }] , 4.12)).to.throw('Invalid Information!')
         })
    
         it('should return correct number of available items', () => {
            let result = foodDelivery.addMenuItem({ name: "Soup", price: 6 }, 10);
            expect(result).toBe("There are 5 available menu items matching your criteria!");
          
            result = foodDelivery.addMenuItem({ name: "Steak", price: 20 }, 10);
            expect(result).to.be("There are 4 available menu items matching your criteria!");
          });
    
          it('should throw an error when menuItem is not an array', () => {
            expect(() => {
              addMenuItem("Invalid Array", 10);
            }).to.throw("Invalid Information!");
          });
          it('should throw an error when maxPrice is less than 5', () => {
            expect(() => {foodDelivery.
              addMenuItem([{ name: "Pizza", price: 10 }], 3);
            }).to.throw("Invalid Information!");
          });
    
          it('should throw an error when menuItem is empty array', () => {
            expect(() => {
              foodDelivery.addMenuItem([], 10);
            }).to.throw("Invalid Information!");
          });
    
          it('should throw an error when maxPrice is not a number', () => {
            expect(() => {
             foodDelivery.addMenuItem([{ name: "Pizza", price: 10 }], "not a number");
            }).to.throw("Invalid Information!");
          });
        });
    });

    describe(`calculateOrderCost` , ()=> {
        it('should return correct price with no discount', () => {
            const result = foodDelivery.calculateOrderCost(
              ['standard', 'express'], 
              ['sauce', 'beverage'],   
              false                    
            );
            expect(result).to.equal('You spend $12.50 for shipping and addons!');
          });
          it('should return correct price with discount', () => {
            const result = foodDelivery.calculateOrderCost(
              ['express'],            
              ['sauce'],               
              true                     
            );
            expect(result).to.equal('You spend $4.90 for shipping and addons with a 15% discount!');
          });
          it('should throw error when shipping is not an array', () => {
            expect(() => {foodDelivery.
              calculateOrderCost("not an array", ['sauce'], true);
            }).to.throw("Invalid Information!");
          });
          it('should throw error when addons is not an array', () => {
            expect(() => {foodDelivery.
              calculateOrderCost(['standard'], "not an array", true);
            }).to.throw("Invalid Information!");
          });

          it('should throw error when discount is not a boolean', () => {
            expect(() => {foodDelivery.
              calculateOrderCost(['standard'], ['sauce'], "not a boolean");
            }).to.throw("Invalid Information!");
          });
        
    })
     
        })
     


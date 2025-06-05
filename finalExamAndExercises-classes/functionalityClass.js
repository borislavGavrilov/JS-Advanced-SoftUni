class RefurbishedSmartphones {

    availableSmartphones = []
    soldSmartphones = []
    constructor (retailer , revenue = 0){
        this.retailer = retailer
        this.revenue = revenue
    }

    addSmartphone (model, storage, price, condition) {
        if (!(model)){

           throw new Error (`Invalid smartphone!`)
        }

        if (typeof storage !== `number` || storage < 0){

            throw new Error (`Invalid smartphone!`)

        }

        if (price < 0){
            throw new Error (`Invalid smartphone!`)
        }
          
        if (!(condition)){
            throw new Error (`Invalid smartphone!`)
        }

        this.availableSmartphones.push({model , storage , price , condition})
        return `New smartphone added: ${model} / ${storage} GB / ${condition} condition - ${price.toFixed(2)}$`
    }

    sellSmartphone (model, desiredStorag){

        let findIsAvailablePhone = this.availableSmartphones.find(phones => phones.model === model)

        if (!(findIsAvailablePhone)){
            throw new Error (`${model} was not found!`)
        }
        let AvailablePhonePrice = findIsAvailablePhone.price
        let storageAvaillablePhone = findIsAvailablePhone.storage

        if (storageAvaillablePhone < desiredStorag) {
            AvailablePhonePrice *= 0.90
        }

        if (storageAvaillablePhone > desiredStorag) {
            AvailablePhonePrice *= 0.80
        }

        this.availableSmartphones = this.availableSmartphones.filter(elements => elements !== model)

        this.soldSmartphones.push({model:findIsAvailablePhone.model,
                                   storage:findIsAvailablePhone.storage, 
                                    soldPrice:AvailablePhonePrice})

       this.revenue += AvailablePhonePrice
       return `${model} was sold for ${AvailablePhonePrice.toFixed(2)}$`

    }

    upgradePhones () {
        debugger
        if (this.availableSmartphones.length <= 0 ){
            throw new Error (`There are no available smartphones!`)
        }
        let buff = [`Upgraded Smartphones:`]
        this.availableSmartphones.forEach(element => {
            element.storage *= 2

            buff.push(`${element.model} / ${element.storage} GB / ${element.condition} condition / ${element.price.toFixed(2)}$`)

        })
       
      return buff.join(`\n`)
    }
  
    salesJournal (criteria) {
        if (criteria !== `storage` && criteria !== `model`) {
           throw new Error (`Invalid criteria!`)
        }
        
        if (criteria === `storage`){
            this.soldSmartphones = this.soldSmartphones.sort((a,b) => b.storage - a.storage)
        }else {
            this.soldSmartphones = this.soldSmartphones.sort((a,b) =>a.model.localeCompare(b.model))
        }

        let messegase = [`${this.retailer} has a total income of ${this.revenue.toFixed(2)}`,
                          `${this.soldSmartphones.length} smartphones sold:`,
        ]

        this.soldSmartphones.forEach(element => messegase.push(`${element.model} / ${element.storage.toFixed(2)} GB / ${element.soldPrice.toFixed(2)}$`))

        return messegase.join(`\n`)
    }

}

let retailer = new RefurbishedSmartphones('SecondLife Devices');

retailer.addSmartphone('Samsung S20 Ultra', 256, 1000, 'good');

retailer.addSmartphone('Iphone 12 mini', 128, 800, 'perfect');

retailer.addSmartphone('Xiaomi Redmi Note 10 Pro', 128, 330, 'perfect');

retailer.sellSmartphone('Samsung S20 Ultra', 256);

retailer.sellSmartphone('Xiaomi Redmi Note 10 Pro', 256);

console.log(retailer.salesJournal('model'));
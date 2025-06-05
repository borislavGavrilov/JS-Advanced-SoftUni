class Hotel{
    roomAvailability = {}
    supplyStock = {}

    constructor(initialBudget){
        this.initialBudget = initialBudget
    }

restockSupplies (supplies){
        let messeges = []
        for (let element of supplies){
            let [supplyName , supplyQuantity , supplyTotalPrice] = element.split(` `)
             supplyQuantity = Number(supplyQuantity)
             supplyTotalPrice = Number(supplyTotalPrice)
             
            if (supplyTotalPrice <= this.initialBudget){
                if (!(supplyName in this.supplyStock)){
                     this.supplyStock[supplyName] = supplyQuantity
                     this.initialBudget -= supplyQuantity
                     
                   messeges.push(`Successfully stocked ${supplyQuantity} ${supplyName}`)
                     
                }else {
                    this.supplyStock[supplyName] += supplyQuantity
                    this.initialBudget -= supplyTotalPrice
                    messeges.push(`Successfully stocked ${supplyQuantity} ${supplyName}`)
                }
            }else {
                messeges.push(`There was not enough money to restock ${supplyQuantity} ${supplyName}`);
            }
          
    }
    return messeges.join(`\n`)
}
addRoomType(roomType, neededSupplies, pricePerNight){

    for (let elements of neededSupplies){
        let [supplyName , supplyQuantity] = elements.split(` `)
        supplyQuantity=Number(supplyQuantity)
           let messege = []
        if (!(roomType in this.roomAvailability)){
           this.roomAvailability[roomType] = [{supplyName,supplyQuantity,pricePerNight}]
           let entries = Object.entries(this.roomAvailability)
          
           messege.push(`Great idea! Now with the ${roomType}, we have ${entries.length} types of rooms available, any other ideas?`)
        }else {
            messege.push(`The ${roomType} is already available in our hotel, try something different.`)
        }
        return messege.join(`\n`)
    }

}
showAvailableRooms(){

    let entires = Object.entries(this.roomAvailability)
    let messeges = []
    if (entires.length > 0){
        for (let [key ,[{pricePerNight}]] of entires){
            messeges.push(`${key} - $ ${pricePerNight}`)
        }
    }else {
        messeges.push(`Our rooms are not ready yet, please come back later...`)
    }

    return messeges.join(`\n`)
} 
bookRoom(roomType){
    let messeges = []
    if (roomType in this.roomAvailability){
        let objectSupplyName = this.roomAvailability[roomType].map(element => element.supplyName)
        
        if (!(objectSupplyName in this.supplyStock)){
          messeges.push(`We are currently unable to accommodate your request for ${roomType}, sorry for the inconvenience.`)
        }else {
            let objectPrice = this.roomAvailability[roomType].map(element=> element.pricePerNight)
            messeges.push(`Your booking for ${roomType} has been confirmed! The price is $${objectPrice.join(``)} per night.`)
        }
        
    }else {
        messeges.push(`There is no ${roomType} available, would you like to book another room?`)
    }
    return messeges.join(`\n`)
}
}


let hotel = new Hotel(500); 

console.log(hotel.restockSupplies(["Soap 100 50", "Towels 20 100", "Shampoo 50 75"])); 

console.log(hotel.addRoomType("Deluxe Suite", ["Soap 5", "Towels 2"], 200)); 

console.log(hotel.addRoomType("Standard Room", ["Soap 2", "Towels 1"], 100)); 

console.log(hotel.showAvailableRooms()); 

console.log(hotel.bookRoom("Apartment")); 

console.log(hotel.bookRoom("Deluxe Suite")); 
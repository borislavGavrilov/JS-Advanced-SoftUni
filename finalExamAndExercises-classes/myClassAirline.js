class AirlineFleet {
    planes = []
    completedFlights = []
    constructor (budget){
        this.budget = budget
    }

    addPlane(model , cost , capacity , fuelConsumption){
        let messegase = []
        cost = Number(cost)

        if (cost > this.budget){
            return `Not enough budget to add '${model}' plane.`
            
        }else {
            this.budget -= cost
            this.planes.push({model , cost , capacity , fuelConsumption})
            return `The plane '${model}' has been successfully added to the airline fleet.`
        }

       

    }

    scheduleFlight(destination , ticketPrice , requiredFuel , passengers){
        

        if (this.planes.length <= 0){
            throw Error(`No planes available for scheduling flights.`)
        }

        let selectedPlane = this.planes.find(plane => plane.fuelConsumption < requiredFuel)

        if (!selectedPlane) {
            return  `Not enough fuel capacity to reach ${destination}.`
        }else {
            this.completedFlights.push(destination)
            let revenue = ticketPrice * passengers
            this.budget+= revenue
            return `Flight to ${destination} completed successfully. Revenue: $${revenue}.`

        }

         return messeges.join(`\n`)




    }

    getPlanesByCapacity(minCapacity){

        if (minCapacity <= 0){
            return `The capacity must be a positive number.`
        }

        let findCapacityLength = this.planes.filter(element => element.capacity >= minCapacity)

        if (findCapacityLength.length > 0){
            return `You have ${findCapacityLength.length} planes with capacity ${minCapacity} or higher.`
        }else {
            return `No planes found with capacity ${minCapacity} or higher.`
        }
        

    }

    airlineSummary() {
       
        let summary = []
        if (this.completedFlights.length <= 0){
            throw Error (`No flights have been completed yet!`);
        }else {
            summary.push(`Budget left ${this.budget}.`)
            summary.push(`You have completed ${this.completedFlights.length} flights.`)
            summary.push(`Airline fleet:`)
            this.planes.forEach(element => {
                summary.push(`${element.model} - Cost: ${element.cost}, Capacity: ${element.capacity}, Fuel Consumption: ${element.fuelConsumption}`) 
            });
        }

        return summary.join(`\n`)
    }
}
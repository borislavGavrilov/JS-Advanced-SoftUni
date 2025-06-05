class AirlineFleet {
    constructor(budget) {
        this.budget = budget;
        this.planes = [];
        this.completedFlights = [];
    }

    addPlane(model, cost, capacity, fuelConsumption) {
      
        if (cost > this.budget) {
            return `Not enough budget to add '${model}' plane.`;
        }

       
        this.budget -= cost;

       
        this.planes.push({ model, cost, capacity, fuelConsumption });

        return `The plane '${model}' has been successfully added to the airline fleet.`;
    }

    scheduleFlight(destination, ticketPrice, requiredFuel, passengers) {
       
        if (this.planes.length === 0) {
            throw new Error("No planes available for scheduling flights.");
        }

        
        const selectedPlane = this.planes.find(plane => plane.fuelConsumption < requiredFuel);

       
        if (!selectedPlane) {
            return `Not enough fuel capacity to reach ${destination}.`;
        }

       
        const revenue = ticketPrice * passengers;

        
        this.completedFlights.push(destination);

       
        this.budget += revenue;

        return `Flight to ${destination} completed successfully. Revenue: $${revenue}.`;
    }

    getPlanesByCapacity(minCapacity) {
       
        if (minCapacity <= 0) {
            return "The capacity must be a positive number.";
        }

       
        const filteredPlanes = this.planes.filter(plane => plane.capacity >= minCapacity);

      
        if (filteredPlanes.length === 0) {
            return `No planes found with capacity ${minCapacity} or higher.`;
        }

        return `You have ${filteredPlanes.length} planes with capacity ${minCapacity} or higher.`;
    }

    airlineSummary() {
       
        if (this.completedFlights.length === 0) {
            throw new Error("No flights have been completed yet!");
        }

    
        let summary = [];
        summary.push(`Budget left $${this.budget}.`);
        summary.push(`You have completed ${this.completedFlights.length} flights.`);
        summary.push(`Airline fleet:`);

       
        this.planes.forEach(plane => {
            summary.push(`${plane.model} - Cost: ${plane.cost}, Capacity: ${plane.capacity}, Fuel Consumption: ${plane.fuelConsumption}`);
        });

        return summary.join("\n");
    }
}

let airline = new AirlineFleet(1000000); 

console.log(airline.addPlane("Boeing 737", 300000, 180, 5000)); 

console.log(airline.addPlane("Airbus A320", 250000, 160, 4800)); 

console.log(airline.scheduleFlight("London", 600, 9000, 180)); 

console.log(airline.scheduleFlight("Berlin", 550, 8000, 160)); 


console.log(airline.airlineSummary()); 
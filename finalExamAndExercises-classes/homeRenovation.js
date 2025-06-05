class HomeRenovation { 
 tasks = []
 completedTasks=[]
    constructor(budget){
        this.budget = budget
    }

    addTask(description, cost, priority){

        let messeges = []

        if (cost > this.budget){
            messeges.push(`Not enough budget to add '${description}' task.`)
        }else {
            this.budget -= cost
            this.tasks.push({description , cost , priority})
            
            messeges.push(`The task '${description}' has been successfully added to the renovation plan.`)

        }

        return messeges.join(`\n`)

    }

    markTaskAsCompleted(description){
        let messeges = []
        let findNeedetDescription = this.tasks.find(elements => elements.description === description)
        
        if (findNeedetDescription){
            let needetIndex = this.tasks.findIndex(element => element.description === description)
            this.completedTasks.push(findNeedetDescription)
            this.tasks.splice(needetIndex , 1)

           messeges.push(`The task '${description}' has been successfully completed.`)
        }else {
         throw new Error(`Task '${description}' not found in the renovation plan.`)
        }
        return messeges.join(`\n`)
    }

    getPriorityTasksCount (minimalPriority) {
        let messeges = []

        if (minimalPriority <= 0){
            messeges.push(`The priority cannot be zero or negative.`)
        }else {
            let findPreoritets = this.tasks.filter(elements => elements.priority >= minimalPriority)
            if (findPreoritets.length > 0){
                messeges.push(`You have ${findPreoritets.length} tasks to prioritize.`)
            }else {
                messeges.push(`No tasks found with priority ${minimalPriority} or higher.`)
            }
            
        }
        return messeges.join(`\n`)
    }

    renovationSummary(){
        let messeges = []
        if (this.completedTasks.length === 0){
           throw new Error(`No tasks have been completed yet!`);
        }else {
            messeges.push(`Budget left $${this.budget}.`)
            messeges.push(`You have completed ${this.completedTasks.length} tasks.`)
            messeges.push(`Pending tasks in the renovation plan:`)
            this.tasks.forEach(elements => {
                messeges.push(`${elements.description} - Cost: ${elements.cost}, Priority: ${elements.priority}`)
            })
        }
        return messeges.join(`\n`)
    }

    
}
const renovation = new HomeRenovation(10000); 

console.log(renovation.addTask("Paint walls", 1500, 2));  

console.log(renovation.addTask("Install new windows", 5000, 1));  

console.log(renovation.markTaskAsCompleted("Paint walls"));  

console.log(renovation.renovationSummary()); 
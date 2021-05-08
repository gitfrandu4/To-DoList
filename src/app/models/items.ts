export class Item {
    description: String;
    date: Date;
    state: 'done' | 'active' | 'undone'; 
    // respectivamente: resuelto | en proceso | pendiente

    constructor(description: String, state?: 'done' | 'active' | 'undone') {
        this.description = description;
        this.date = new Date(Date.now());
        this.state = state ? state : 'undone';
    }   
}
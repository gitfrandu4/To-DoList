export class Item {
    description: string;
    date: Date;
    state: 'done' | 'active' | 'undone' | "deleted"; 
    // respectivamente: resuelto | en proceso | pendiente

    /**
     * 
     * @param description Descripción de la tarea
     * @param state Estado de la tarea
     */
    constructor(description: string, state?: 'done' | 'active' | 'undone') {
        this.description = description;
        this.date = new Date(Date.now());
        this.state = state ? state : 'undone';
    }  
}

//!Iconos 
export interface TableAction {
    label?: string;
    icon?: string;
    actionType: string;
    color?: string;
}

export interface TableColumn {
    //Nombre de la columna
    label: string;
    //!DataKey que apunta donde mapear
    def: string;
    //Esto pes para ponerle un formato a la columna cuando lo necesite 
    type?: 'text' | 'date' | 'currency' | 'status' | 'action' | 'icon';
    //Acciones de iconos de columna 
    actions?: TableAction[];
}
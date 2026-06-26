export interface Column<T>{
    header:string;
    accessor:keyof T;
}

export interface TableProps<T>{
    data:T[];
    columns:Column<T>[];
}
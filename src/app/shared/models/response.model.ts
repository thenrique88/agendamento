export interface ResponseModel<T>{
    sucesso: boolean;
    data: T;
    erros: string[];
}
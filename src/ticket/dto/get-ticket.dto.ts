export class GetTicketDTO{
    folio: number;
    fecha: string;
    products: TicketProductDTO[] ;
    total: number;
}

export class TicketProductDTO{
    cantidad: number;
    subtotal: number;
}
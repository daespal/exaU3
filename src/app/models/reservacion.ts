export class Reservacion {
    id?: string;
    codigo: string;
    nombre: string;
    telefono: string;
    fechaIni: string;
    fechaEgr: string;
    habitacion: string;
    anticipo: number =0;
    total: number =0;
    tokens?: string;
}

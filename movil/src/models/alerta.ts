export interface Alerta {
    $key?:string;
    descripcion: string;
    lat: number;
    lon: number;
    tiempo: any;
    tipo: string;
    junta: string;
    usuario: string;
  }
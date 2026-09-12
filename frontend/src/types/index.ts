export type TabType = 'auto' | 'dni' | 'cif' | 'iban' | 'cp' | 'matricula' | 'telefono';

export interface ValidationResult {
  valido: boolean;
  tipo?: string | null;
  formato?: string | null;
  provincia?: string | null;
  banco?: string | null;
  entidad?: string | null;
  detalles?: string | null;
  controlEsperado?: string | null;
  controlRecibido?: string | null;
  origen?: 'api' | 'local';
  latenciaMs?: number;
  urlConsultada?: string;
  statusHttp?: number;
}

export interface ExamplePreset {
  etiqueta: string;
  valor: string;
  descripcion: string;
  valido: boolean;
  categoria: TabType;
}

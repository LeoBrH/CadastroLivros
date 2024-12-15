import { FormaCompra } from "./forma-compra.model";

export interface LivroValor {
    livro_Codl: number;
    forma_Compra_CodFC: number;
    formaCompra: FormaCompra;
    valor: number;
  }
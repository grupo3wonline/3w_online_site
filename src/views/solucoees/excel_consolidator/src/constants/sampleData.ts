import type { ProcessedFile } from '@/types'

export const sampleFiles: ProcessedFile[] = [
  {
    id: 'sample-sp-1',
    name: 'Vendas_Regiao_SP.xlsx',
    sanitizedName: 'Vendas_Regiao_SP.xlsx',
    size: '12.4 KB',
    sizeBytes: 12697,
    sheetCount: 1,
    rowsCount: 4,
    sheets: [
      {
        sheetName: 'Vendas SP',
        data: [
          {
            ID_Venda: 101,
            Cliente: 'Ana Silva',
            Produto: 'Notebook Dell',
            Quantidade: 1,
            Valor_Total: 4500.0,
            Data: '2026-01-10',
          },
          {
            ID_Venda: 102,
            Cliente: 'Carlos Souza',
            Produto: 'Mouse Sem Fio',
            Quantidade: 2,
            Valor_Total: 160.0,
            Data: '2026-01-11',
          },
          {
            ID_Venda: 103,
            Cliente: 'Mariana Oliveira',
            Produto: 'Monitor 27"',
            Quantidade: 1,
            Valor_Total: 1200.0,
            Data: '2026-01-12',
          },
          {
            ID_Venda: 104,
            Cliente: 'Lucas Ferreira',
            Produto: 'Teclado Mecânico',
            Quantidade: 1,
            Valor_Total: 350.0,
            Data: '2026-01-13',
          },
        ],
      },
    ],
  },
  {
    id: 'sample-rj-2',
    name: 'Vendas_Regiao_RJ.xlsx',
    sanitizedName: 'Vendas_Regiao_RJ.xlsx',
    size: '14.1 KB',
    sizeBytes: 14438,
    sheetCount: 1,
    rowsCount: 4,
    sheets: [
      {
        sheetName: 'Vendas RJ',
        data: [
          {
            ID_Venda: 201,
            Cliente: 'Roberto Lima',
            Produto: 'Teclado Mecânico',
            Quantidade: 1,
            Valor_Total: 350.0,
            Data: '2026-01-15',
          },
          {
            ID_Venda: 202,
            Cliente: 'Fernanda Santos',
            Produto: 'Notebook Dell',
            Quantidade: 1,
            Valor_Total: 4500.0,
            Data: '2026-01-16',
          },
          {
            ID_Venda: 203,
            Cliente: 'Gabriel Costa',
            Produto: 'Cadeira Ergonômica',
            Quantidade: 1,
            Valor_Total: 980.0,
            Data: '2026-01-18',
          },
          {
            ID_Venda: 204,
            Cliente: 'Patricia Gomes',
            Produto: 'Headset USB',
            Quantidade: 2,
            Valor_Total: 440.0,
            Data: '2026-01-19',
          },
        ],
      },
    ],
  },
]

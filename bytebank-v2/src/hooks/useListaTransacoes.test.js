import { act, renderHook } from "@testing-library/react";
import { buscaTransacoes } from "../services/transacoes";
import useListaTransacoes from "./useListaTransacoes";

jest.mock('../services/transacoes')

const mockTransaction = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '28/09/2023',
    mes: 'Setembro',
  },
];

describe('hooks/useListaTransacoes.js', () => {
  it('should be return a list of transactions and a function to update it', async() => {
    buscaTransacoes.mockImplementation(() => mockTransaction)

    const { result } = renderHook(() => useListaTransacoes())
    expect(result.current[0]).toEqual([])

    await act(async() => {
      result.current[1]()
    })
    expect(result.current[0]).toEqual(mockTransaction)
  })
})
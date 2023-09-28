import api from './api';
import { buscaTransacoes } from './transacoes';

jest.mock('./api');

const mockTransaction = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '28/09/2023',
    mes: 'Setembro',
  },
];

const mockRequest = (returning) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: returning,
      });
    }, 200);
  });
};

const mockRequestError = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

describe('Requests to the API', () => {
  it('Should be return a list of transactions', async () => {
    api.get.mockImplementation(() => mockRequest(mockTransaction));

    const transactions = await buscaTransacoes();
    expect(transactions).toEqual(mockTransaction);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  it('Should be return an empty list when the request is fails', async () => {
    api.get.mockImplementation(() => mockRequestError());

    const transactions = await buscaTransacoes();

    expect(transactions).toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });
});

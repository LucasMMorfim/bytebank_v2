import api from './api';
import { buscaSaldo } from './saldo';

jest.mock('./api');

const mockBalance = {
  valor: 50,
};

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
  it('Should be return current balance', async () => {
    api.get.mockImplementation(() => mockRequest(mockBalance))

    const currentBalance = await buscaSaldo()
    expect(currentBalance).toEqual(mockBalance.valor)
    expect(api.get).toHaveBeenCalledWith('/saldo')
  });

  it('Should be return current balance equal to 1000', async () => {
    api.get.mockImplementation(() => mockRequestError())
    const currentBalance = await buscaSaldo()

    expect(currentBalance).toEqual(1000)
    expect(api.get).toHaveBeenCalledWith('/saldo')
    expect(api.get).toHaveBeenCalledTimes(1);
  });
});
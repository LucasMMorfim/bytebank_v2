import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import App from './App'
import AppRoutes from "../../routes/routes"

describe('<App/>', () => {
  it('Should be allow add a transaction to the statement', () => {
    render(<App/>, {wrapper: BrowserRouter})

    const valueField = screen.getByPlaceholderText('Digite um valor')
    const select = screen.getByRole('combobox');
    const button = screen.getByRole('button');

    userEvent.selectOptions(select, ['Depósito']);
    userEvent.type(valueField, '100');
    userEvent.click(button);

    const newTransaction = screen.getByTestId('lista-transacoes');
    const statementItem = screen.getByRole('listitem')

    expect(newTransaction).toContainElement(statementItem)
  })

  it('Should be navigate to the page corresponding to the clicked link (Cartões)', async () => {
    render(<AppRoutes/>, {wrapper: BrowserRouter})

    const cardsPageLink = screen.getByText('Cartões')
    expect(cardsPageLink).toBeInTheDocument();

    userEvent.click(cardsPageLink)

    const cardsPageTitle = await screen.findByText('Meus cartões')
    expect(cardsPageTitle).toBeInTheDocument();
  })

  it('Should be navigate to the page corresponding to the clicked link (Investimentos)', async () => {
    render(<AppRoutes/>, {wrapper: BrowserRouter})

    const investmentsPageLink = screen.getByText('Investimentos')
    expect(investmentsPageLink).toBeInTheDocument();

    userEvent.click(investmentsPageLink)

    const investmentsPageTitle = await screen.findByText('Renda Fixa')
    expect(investmentsPageTitle).toBeInTheDocument();
  })
})
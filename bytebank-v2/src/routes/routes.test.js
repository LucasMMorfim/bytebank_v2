const { render, screen } = require("@testing-library/react")
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import App from '../paginas/Principal/App'
import AppRoutes from '../routes/routes'
import Cartoes from '../componentes/Cartoes'

describe('Routes', () => {
  it('Should be render main route', () => {
    render(<App/>, {wrapper: BrowserRouter})
    const user = screen.getByText('Olá, Joana :)!')
    expect(user).toBeInTheDocument()
  })

  it('Should be render cards route', () => {
    const route = '/cartoes'
    render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="cartoes" element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const myCards = screen.getByText('Meus cartões');
    expect(myCards).toHaveTextContent('Meus cartões');
  });

  it('Should be render the location of the current route', () => {
    const route = '/cartoes';
    render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );

    const currentLocation = screen.getByTestId('local')
    expect(currentLocation).toHaveTextContent(route)
  })

  it('Should be render the 404 page', () => {
    const route = '/extrato'
    render(
      <MemoryRouter initialEntries={[route]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const erroPage = screen.getByTestId('pagina-404')
    expect(erroPage).toContainHTML('<h1>Ops! Não encontramos a página</h1>')
  })
});
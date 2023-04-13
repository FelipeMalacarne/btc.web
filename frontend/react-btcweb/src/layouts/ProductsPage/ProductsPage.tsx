import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Table } from "react-bootstrap";
import ProductModel from "../../models/ProductModel";
import { Pagination } from "../Utils/Pagination";

export const ProductsPage = () => {
  const [drinks, setDrinks] = useState<ProductModel[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [drinksPerPage] = useState(20);
  const [totalAmountOfDrinks, setTotalAmountOfDrinks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [searchUrl, setSearchUrl] = useState('');
  const [categorySelection, setCategorySelection] = useState('Drink category')

  useEffect(() => {
    const fetchDrinks = async () => {
      const baseUrl: string = 'http://localhost:8080/api/products'

      let url: string = `${baseUrl}?page=${currentPage - 1}&size=${drinksPerPage}`;

      if (searchUrl === '') {
        url = `${baseUrl}?page=${currentPage - 1}&size=${drinksPerPage}`;
      } else {
        let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`);
        url = baseUrl + searchWithPage;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.products;

      setTotalAmountOfDrinks(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);


      const loadedDrinks: ProductModel[] = [];

      for (const key in responseData) {
        loadedDrinks.push({
          id: responseData[key].id,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          isActive: responseData[key].isActive,
        });
      }
      console.log(loadedDrinks)
      setDrinks(loadedDrinks);
      setIsloading(false);
    };

    fetchDrinks().catch((error: any) => {
      setIsloading(false);
      setHttpError(error.message)
    });


  }, [currentPage, searchUrl])

  if (isLoading) {
    return (
      <SpinnerLoading />
    )
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    )
  }

  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === '') {
      setSearchUrl('')
    } else {
      setSearchUrl(`/search/findByNameContaining?title=${search}&page=<pageNumber>&size=${drinksPerPage}`)
    }
    setCategorySelection('Drink Category')
  }

  const categoryField = (value: string) => {
    setCurrentPage(1);
    if (
      value.toLowerCase() === 'alcólico'
    ) {
      setCategorySelection(value)
      setSearchUrl(`/search/findByCategory?category=${value.toLowerCase()}&page=<pageNumber>&$size=${drinksPerPage}`)
    } else {
      setCategorySelection('All')
      setSearchUrl(`?page=<pageNumber>&size=${drinksPerPage}`)
    }
  }

  const indexOfLastDrink: number = currentPage * drinksPerPage;
  const IndexOfFirstDrink: number = indexOfLastDrink - drinksPerPage;
  let lastItem: number = drinksPerPage * currentPage <= totalAmountOfDrinks ?
    drinksPerPage * currentPage : totalAmountOfDrinks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <div className="Container">
      <div>
        <div className="row m-3">
          <div className="col-6">
            <div className="d-flex">
              <input
                className="form-control me-2" type="search"
                placeholder="Search" aria-labelledby="Search"
                onChange={e => setSearch(e.target.value)}
              />
              <button
                className="btn  btn-outline-primary"
                onClick={() => searchHandleChange()}
              >Search</button>
            </div>
          </div>
          <div className="col-4">
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button"
                id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {categorySelection}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li onClick={() => categoryField('All')}>
                  {/* todo, get from loadedDrinks */}
                  <a className="dropdown-item" href="#">
                    All
                  </a>
                </li>
                <li onClick={() => categoryField('Alcólico')}>
                  <a className="dropdown-item" href="#">
                    Alcólico
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </div>
        <hr />

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>?</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              totalAmountOfDrinks > 0 ?
                <>
                  {drinks.map(drink => (
                    <tr>
                      <td>{drink.id}</td>
                      <td>{drink.name}</td>
                      <td>?</td>
                      <td>R$ {drink.price}</td>
                    </tr>
                  ))}
                </>
                :
                <div className="m-3">
                  <h3>
                    Can't find what you are looking for?
                  </h3>
                  <a className="btn main-color btn-md px-4 me-md-2 fw-bold text-white" type="button" href="#">
                    aaa
                  </a>
                </div>
            }
          </tbody>
        </Table>
        {totalPages > 1 &&
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate} />
        }

      </div>
    </div>

  );
}
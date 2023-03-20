export const Footer = () => {
    return (
        <div className="main-color">
            <footer className="container d-flex flex-wrap justify-content-between align-items-center py-4 main-color">
            <p className="col-md-4 mb-0 text-white">© Boteco. Pub & Bar</p>
            <ul className="nav navbar-dark col-md-4 justify-content-end">
                <li className="nav-item"> 
                    <a className="nav-link px-2 text-white" href="#"> Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link px-2 text-white" href="#">Search Books</a>
                </li>
            </ul>
            </footer>
        </div>
    );
}
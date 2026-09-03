import { Link } from 'react-router';
import { useNavigate } from 'react-router';

export function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="section-404 section">
            <div className="container">
                <div className="content-404">
                    <h1 className="title">404</h1>
                    <h2 className="sub-title">Страницата не е намерена!</h2>
                    <p>Можете да се върнете назад или да отидете на началната страница</p>
                    <div className="buttons">
                        <button className="btn btn-primary btn-outline-hover-dark" onClick={() => navigate(-1)}>
                            Върни се назад
                        </button>
                        <Link className="btn btn-dark btn-outline-hover-dark" to="/">
                            Начална страница
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

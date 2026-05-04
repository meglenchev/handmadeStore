import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import QuickViewContext from '../../../context/QuickViewContext.jsx';

export function ProductsInFocus() {
    const { openQuickView } = useContext(QuickViewContext);

    const item = {};

    return (
        <div className="section section-padding">
            <div className="container">
                <div className="row justify-content-between">
                    {/* Section Title Start */}
                    <div className="col-lg-auto col-12">
                        <div className="section-title2">
                            <h2 className="title">Продукти на фокус</h2>
                            <p>Следвайте най-популярните тенденции и се възползвайте от ексклузивни артикули от магазина за ръкоделия Learts.</p>
                        </div>
                    </div>
                    {/* Section Title End */}
                    {/* Tab Button List Start */}
                    <div className="col-lg-auto col-12 learts-mb-30">
                        <nav className="nav mx-n1 learts-mb-n10">
                            <a className="btn btn-md btn-light btn-hover-primary active mx-1 learts-mb-10" href="#tab-gift-ideas">
                                идеи за подаръци
                            </a>
                            <a className="btn btn-md btn-light btn-hover-primary mx-1 learts-mb-10" href="#tab-home-decor">
                                домашен декор
                            </a>
                            <a className="btn btn-md btn-light btn-hover-primary mx-1 learts-mb-10" href="#tab-kitchen">
                                кухня
                            </a>
                        </nav>
                    </div>
                    {/* Section Title End */}
                </div>
                <div className="prodyct-tab-content1 tab-content">
                    <div className="tab-pane fade show active" id="tab-gift-ideas">
                        {/* Products Start */}
                        <div className="products row row-cols-md-3 row-cols-sm-2 row-cols-1">
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <img src="../../assets/images/product/s328/product-27.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-27-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">Ключови орнаменти с висулка</a>
                                        </h6>
                                        <span className="price">€35.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <span className="product-badges">
                                                <span className="outofstock">
                                                    <FontAwesomeIcon icon="frown" />
                                                </span>
                                                <span className="hot">hot</span>
                                            </span>
                                            <img src="../../assets/images/product/s328/product-27.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-27-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                        <div className="product-options">
                                            <ul className="Цвятs">
                                                <li style={{ backgroundColor: '#000000' }}>Цвят one</li>
                                                <li style={{ backgroundColor: '#b2483c' }}>Цвят two</li>
                                            </ul>
                                            <ul className="sizes">
                                                <li>Large</li>
                                                <li>Medium</li>
                                                <li>Small</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">Декоративна коледна лисица</a>
                                        </h6>
                                        <span className="price">€50.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <span className="product-badges">
                                                <span className="hot">hot</span>
                                            </span>
                                            <img src="../../assets/images/product/s328/product-27.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-27-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">Модерен камера</a>
                                        </h6>
                                        <span className="price">€380.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <span className="product-badges">
                                                <span className="hot">hot</span>
                                            </span>
                                            <img src="../../assets/images/product/s328/product-27.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-27-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">Щастливо дървено слонче</a>
                                        </h6>
                                        <span className="price">€35.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <span className="product-badges">
                                                <span className="hot">hot</span>
                                            </span>
                                            <img src="../../assets/images/product/s328/product-27.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-27-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">Цифрова камера</a>
                                        </h6>
                                        <span className="price">€350.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <span className="product-badges">
                                                <span className="hot">hot</span>
                                            </span>
                                            <img src="../../assets/images/product/s328/product-27.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-27-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">LCD таблет за писане</a>
                                        </h6>
                                        <span className="price">€250.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Products End */}
                    </div>
                    <div className="tab-pane fade" id="tab-home-decor">
                        {/* Products Start */}
                        <div className="products row row-cols-md-3 row-cols-sm-2 row-cols-1">
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <span className="product-badges">
                                                <span className="hot">hot</span>
                                            </span>
                                            <img src="../../assets/images/product/s328/product-7.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-7-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">Цифрова камера</a>
                                        </h6>
                                        <span className="price">€350.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <span className="product-badges">
                                                <span className="hot">hot</span>
                                            </span>
                                            <img src="../../assets/images/product/s328/product-7.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-7-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">LCD таблет за писане</a>
                                        </h6>
                                        <span className="price">€250.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <img src="../../assets/images/product/s328/product-7.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-7-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">Ключови орнаменти с висулка</a>
                                        </h6>
                                        <span className="price">€35.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <span className="product-badges">
                                                <span className="outofstock">
                                                    <FontAwesomeIcon icon="frown" />
                                                </span>
                                                <span className="hot">hot</span>
                                            </span>
                                            <img src="../../assets/images/product/s328/product-7.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-7-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                        <div className="product-options">
                                            <ul className="Цвятs">
                                                <li style={{ backgroundColor: '#000000' }}>Цвят one</li>
                                                <li style={{ backgroundColor: '#b2483c' }}>Цвят two</li>
                                            </ul>
                                            <ul className="sizes">
                                                <li>Large</li>
                                                <li>Medium</li>
                                                <li>Small</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">Декоративна коледна лисица</a>
                                        </h6>
                                        <span className="price">€50.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <span className="product-badges">
                                                <span className="hot">hot</span>
                                            </span>
                                            <img src="../../assets/images/product/s328/product-7.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-7-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">Модерен камера</a>
                                        </h6>
                                        <span className="price">€380.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <span className="product-badges">
                                                <span className="hot">hot</span>
                                            </span>
                                            <img src="../../assets/images/product/s328/product-7.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-7-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">Щастливо дървено слонче</a>
                                        </h6>
                                        <span className="price">€35.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Products End */}
                    </div>
                    <div className="tab-pane fade" id="tab-kitchen">
                        {/* Products Start */}
                        <div className="products row row-cols-md-3 row-cols-sm-2 row-cols-1">
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <span className="product-badges">
                                                <span className="hot">hot</span>
                                            </span>
                                            <img src="../../assets/images/product/s328/product-8.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-8-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">Модерен камера</a>
                                        </h6>
                                        <span className="price">€380.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <span className="product-badges">
                                                <span className="hot">hot</span>
                                            </span>
                                            <img src="../../assets/images/product/s328/product-8.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-8-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">Щастливо дървено слонче</a>
                                        </h6>
                                        <span className="price">€35.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <span className="product-badges">
                                                <span className="hot">hot</span>
                                            </span>
                                            <img src="../../assets/images/product/s328/product-8.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-8-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">Цифрова камера</a>
                                        </h6>
                                        <span className="price">€350.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <span className="product-badges">
                                                <span className="hot">hot</span>
                                            </span>
                                            <img src="../../assets/images/product/s328/product-8.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-8-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">LCD таблет за писане</a>
                                        </h6>
                                        <span className="price">€250.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <img src="../../assets/images/product/s328/product-8.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-8-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">Ключови орнаменти с висулка</a>
                                        </h6>
                                        <span className="price">€35.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product">
                                    <div className="product-thumb">
                                        <a href="product-details.html" className="image">
                                            <span className="product-badges">
                                                <span className="outofstock">
                                                    <FontAwesomeIcon icon="frown" />
                                                </span>
                                                <span className="hot">hot</span>
                                            </span>
                                            <img src="../../assets/images/product/s328/product-8.webp" alt="Product Image" />
                                            <img className="image-hover " src="../../assets/images/product/s328/product-8-hover.webp" alt="Product Image" />
                                        </a>
                                        <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                            <FontAwesomeIcon icon="heart" />
                                        </a>
                                        <div className="product-options">
                                            <ul className="Цвятs">
                                                <li style={{ backgroundColor: '#000000' }}>Цвят one</li>
                                                <li style={{ backgroundColor: '#b2483c' }}>Цвят two</li>
                                            </ul>
                                            <ul className="sizes">
                                                <li>Large</li>
                                                <li>Medium</li>
                                                <li>Small</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <h6 className="title">
                                            <a href="product-details.html">Декоративна коледна лисица</a>
                                        </h6>
                                        <span className="price">€50.00</span>
                                        <div className="product-buttons">
                                            <button onClick={() => openQuickView(item)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                <FontAwesomeIcon icon="search" />
                                            </button>
                                            <a href="#" className="product-button hintT-top" data-hint="Добавяне в количката">
                                                <FontAwesomeIcon icon="shopping-cart" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Products End */}
                    </div>
                </div>
                <div className="row g-0 justify-content-center learts-mt-50">
                    <a href="#" className="btn p-0">
                        <FontAwesomeIcon icon="plus" /> виж повече ...
                    </a>
                </div>
            </div>
        </div>
    );
}

import { useContext } from 'react';
import Countdown from 'react-countdown';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { settings } from '@/utils/utils.jsx';
import QuickViewContext from '@/context/QuickViewContext.jsx';
import { useSlidesToShow } from '@/hooks/useSlidesToShow.jsx';
import ShopContext from '@/context/ShopContext.jsx';
import WishlistContext from '@/context/WishlistContext.jsx';
import { useQuery } from '@/hooks/useQuery.js';
import { Link } from 'react-router';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { DealOfTheDaySkeleton } from './DealOfTheDaySkeleton.jsx';

const CountdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return <span>Сделката е изтекла!</span>;
    }

    return (
        <div className="countdown2">
            <div className="count">
                <span className="amount">{days}</span>
                <span className="period">Days</span>
            </div>
            <div className="count">
                <span className="amount">{hours}</span>
                <span className="period">Hours</span>
            </div>
            <div className="count">
                <span className="amount">{minutes}</span>
                <span className="period">Minutes</span>
            </div>
            <div className="count">
                <span className="amount">{seconds}</span>
                <span className="period">Seconds</span>
            </div>
        </div>
    );
};

export function DealOfTheDay() {
    const { openQuickView } = useContext(QuickViewContext);
    const { addToCart } = useContext(ShopContext);
    const { toggleWishlist, wishlist } = useContext(WishlistContext);

    const expiryDate = new Date('2026-12-31T23:59:59');

    const slidesToShow = useSlidesToShow();

    const settingsDealOfTheDay = {
        ...settings,
        slidesToShow: slidesToShow,
    };

    const { data: products, loading, error } = useQuery(ENDPOINTS.PRODUCTS.DISCOUNTED, []);

    if (error) {
        return <h2 className="title">Неуспешно зареждане: {error}</h2>;
    }

    if (!loading && (!products || products.length === 0)) {
        return <h2 className="title title-icon-right">В момента няма активни сделки.</h2>;
    }

    return (
        <div className="section section-padding">
            <div className="container">
                <div className="row learts-mb-30">
                    <div className="col-md-auto col-12 learts-mb-20">
                        <div className="section-title2 m-0">
                            <h2 className="title title-icon-right">
                                Сделка на деня <FontAwesomeIcon icon="fire" className="text-primary ms-2" />
                            </h2>
                        </div>
                    </div>
                    <div className="col-md col-12 learts-mb-20 d-flex justify-content-lg-end">
                        <Countdown date={expiryDate} renderer={CountdownRenderer} />
                    </div>
                </div>
                <div className="product-carousel">
                    <Slider key="deal-of-the-day" {...settingsDealOfTheDay}>
                        {loading
                            ? Array.from({ length: 12 }).map((_, index) => <DealOfTheDaySkeleton key={index} />)
                            : products.map((product) => {
                                  const isInWishlist = wishlist.some((item) => item._id === product._id);

                                  return (
                                      <div key={product._id} className="col">
                                          <div className="product">
                                              <div className="product-thumb">
                                                  <Link to={ENDPOINTS.PRODUCTS.DETAILS(product._id)} className="image">
                                                      <span className="product-badges">
                                                          <span className="onsale">{product.discount}%</span>
                                                      </span>
                                                      <img src={product.image} alt={product.title} />
                                                      <img className="image-hover" src={product.hoverImage} alt={product.title} />
                                                  </Link>

                                                  <button
                                                      onClick={() => toggleWishlist(product)}
                                                      className={`add-to-wishlist hintT-left ${isInWishlist ? 'added' : ''}`}
                                                      data-hint={isInWishlist ? 'Премахване от любими' : 'Добавяне в любими'}>
                                                      <FontAwesomeIcon icon="heart" />
                                                  </button>
                                              </div>
                                              <div className="product-info">
                                                  <h6 className="title">
                                                      <Link to={ENDPOINTS.PRODUCTS.DETAILS(product._id)}>{product.title}</Link>
                                                  </h6>
                                                  <span className="price">
                                                      <span className="old">€{product.oldPrice.toFixed(2)}</span>
                                                      <span className="new">€{product.newPrice.toFixed(2)}</span>
                                                  </span>
                                                  <div className="product-buttons">
                                                      <button onClick={() => openQuickView(product)} className="product-button hintT-top" data-hint="Бърз преглед">
                                                          <FontAwesomeIcon icon="search" />
                                                      </button>
                                                      <button onClick={() => addToCart(product)} className="product-button hintT-top" data-hint="Добавяне в количката">
                                                          <FontAwesomeIcon icon="shopping-cart" />
                                                      </button>
                                                  </div>
                                                  <div className="product-stock-status">
                                                      <div className="bar">
                                                          <div className="progress" style={{ width: `${(product.sold / (product.sold + product.stock)) * 100}%` }} />
                                                      </div>
                                                      <span className="sold">
                                                          Продадени: <span>{product.sold}</span>
                                                      </span>
                                                      <span className="available">
                                                          Налични: <span>{product.stock}</span>
                                                      </span>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  );
                              })}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

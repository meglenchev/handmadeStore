import { useQuery } from '@/hooks/useQuery.js';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { Link, useParams } from 'react-router';

export function Product() {
    const { productId } = useParams();
    const { data, loading, error } = useQuery(ENDPOINTS.PRODUCTS.DETAILS(productId), {});
    console.log(data, loading);

    return (
        <>
            <div className="page-title-section section" data-bg-image="assets/images/bg/page-title-1.webp">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="page-title">
                                <h1 className="title">Shop</h1>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/products">Products</Link>
                                    </li>
                                    <li className="breadcrumb-item active">{loading ? <div className="loader">Зареждане</div> : data.title}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section section-padding border-bottom">
                <div className="container">
                    <div className="row learts-mb-n40">
                        {/* Product Images Start */}
                        <div className="col-lg-6 col-12 learts-mb-40">
                            <div className="product-images">
                                <button
                                    className="product-gallery-popup hintT-left"
                                    data-hint="Click to enlarge"
                                    data-images='[
                      {"src": "assets/images/product/single/1/product-zoom-1.webp", "w": 700, "h": 1100},
                      {"src": "assets/images/product/single/1/product-zoom-2.webp", "w": 700, "h": 1100},
                      {"src": "assets/images/product/single/1/product-zoom-3.webp", "w": 700, "h": 1100},
                      {"src": "assets/images/product/single/1/product-zoom-4.webp", "w": 700, "h": 1100}
                  ]'>
                                    <i className="fas fa-expand" />
                                </button>
                                <a href="https://www.youtube.com/watch?v=1jSsy7DtYgc" className="product-video-popup video-popup hintT-left" data-hint="Click to see video">
                                    <i className="fas fa-play" />
                                </a>
                                <div className="product-gallery-slider">
                                    <div className="product-zoom" data-image="assets/images/product/single/1/product-zoom-1.webp">
                                        <img src="assets/images/product/single/1/product-1.webp" alt="" />
                                    </div>
                                    <div className="product-zoom" data-image="assets/images/product/single/1/product-zoom-2.webp">
                                        <img src="assets/images/product/single/1/product-2.webp" alt="" />
                                    </div>
                                    <div className="product-zoom" data-image="assets/images/product/single/1/product-zoom-3.webp">
                                        <img src="assets/images/product/single/1/product-3.webp" alt="" />
                                    </div>
                                    <div className="product-zoom" data-image="assets/images/product/single/1/product-zoom-4.webp">
                                        <img src="assets/images/product/single/1/product-4.webp" alt="" />
                                    </div>
                                </div>
                                <div className="product-thumb-slider">
                                    <div className="item">
                                        <img src="assets/images/product/single/1/product-thumb-1.webp" alt="" />
                                    </div>
                                    <div className="item">
                                        <img src="assets/images/product/single/1/product-thumb-2.webp" alt="" />
                                    </div>
                                    <div className="item">
                                        <img src="assets/images/product/single/1/product-thumb-3.webp" alt="" />
                                    </div>
                                    <div className="item">
                                        <img src="assets/images/product/single/1/product-thumb-4.webp" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Product Images End */}
                        {/* Product Summery Start */}
                        <div className="col-lg-6 col-12 learts-mb-40">
                            <div className="product-summery">
                                <div className="product-nav">
                                    <a href="#">
                                        <i className="fas fa-long-arrow-alt-left" />
                                    </a>
                                    <a href="#">
                                        <i className="fas fa-long-arrow-alt-right" />
                                    </a>
                                </div>
                                <h3 className="product-title">Cleaning Dustpan &amp; Brush</h3>
                                <div className="product-price">£38.00 – £50.00</div>
                                <div className="product-description">
                                    <p>
                                        Easy clip-on handle – Hold the brush and dustpan together for storage; the dustpan edge is serrated to allow easy scraping off the hair
                                        without entanglement. High-quality bristles – no burr damage, no scratches, thick and durable, comfortable to remove dust and smaller
                                        particles.
                                    </p>
                                </div>
                                <div className="product-variations">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="label">
                                                    <span>Size</span>
                                                </td>
                                                <td className="value">
                                                    <div className="product-sizes">
                                                        <a href="#">Large</a>
                                                        <a href="#">Medium</a>
                                                        <a href="#">Small</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="label">
                                                    <span>Color</span>
                                                </td>
                                                <td className="value">
                                                    <div className="product-colors">
                                                        <a href="#" data-bg-color="#000000" />
                                                        <a href="#" data-bg-color="#ffffff" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="label">
                                                    <span>Quantity</span>
                                                </td>
                                                <td className="value">
                                                    <div className="product-quantity">
                                                        <span className="qty-btn minus">
                                                            <i className="ti-minus" />
                                                        </span>
                                                        <input type="text" className="input-qty" defaultValue={1} />
                                                        <span className="qty-btn plus">
                                                            <i className="ti-plus" />
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="product-buttons">
                                    <a href="#" className="btn btn-icon btn-outline-body btn-hover-dark hintT-top" data-hint="Add to Wishlist">
                                        <i className="far fa-heart" />
                                    </a>
                                    <a href="#" className="btn btn-dark btn-outline-hover-dark">
                                        <i className="fas fa-shopping-cart" /> Add to Cart
                                    </a>
                                    <a href="#" className="btn btn-icon btn-outline-body btn-hover-dark hintT-top" data-hint="Compare">
                                        <i className="fas fa-random" />
                                    </a>
                                </div>
                                <div className="product-brands">
                                    <span className="title">Brands</span>
                                    <div className="brands">
                                        <a href="#">
                                            <img src="assets/images/brands/brand-3.webp" alt="" />
                                        </a>
                                        <a href="#">
                                            <img src="assets/images/brands/brand-8.webp" alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div className="product-meta">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="label">
                                                    <span>SKU</span>
                                                </td>
                                                <td className="value">0404019</td>
                                            </tr>
                                            <tr>
                                                <td className="label">
                                                    <span>Category</span>
                                                </td>
                                                <td className="value">
                                                    <ul className="product-category">
                                                        <li>
                                                            <a href="#">Kitchen</a>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="label">
                                                    <span>Tags</span>
                                                </td>
                                                <td className="value">
                                                    <ul className="product-tags">
                                                        <li>
                                                            <a href="#">handmade</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">learts</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">mug</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">product</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">learts</a>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="label">
                                                    <span>Share on</span>
                                                </td>
                                                <td className="va">
                                                    <div className="product-share">
                                                        <a href="#">
                                                            <i className="fab fa-facebook-f" />
                                                        </a>
                                                        <a href="#">
                                                            <i className="fab fa-pinterest" />
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* Product Summery End */}
                    </div>
                </div>
            </div>
            <div className="section section-padding border-bottom">
                <div className="container">
                    <ul className="nav product-info-tab-list">
                        <li>
                            <a className="active" data-bs-toggle="tab" href="#tab-description">
                                Description
                            </a>
                        </li>
                        <li>
                            <a data-bs-toggle="tab" href="#tab-pwb_tab">
                                Brand
                            </a>
                        </li>
                        <li>
                            <a data-bs-toggle="tab" href="#tab-additional_information">
                                Additional information
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content product-infor-tab-content">
                        <div className="tab-pane fade show active" id="tab-description">
                            <div className="row">
                                <div className="col-lg-10 col-12 mx-auto">
                                    <p>
                                        Easy clip-on handle – Hold the brush and dustpan together for storage; the dustpan edge is serrated to allow easy scraping off the hair
                                        without entanglement. High-quality bristles – no burr damage, no scratches, thick and durable, comfortable to remove dust and smaller
                                        particles. Rubber lip – The rubber lip on the front of the dustpan helps to remove all dust at once.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-pwb_tab">
                            <div className="row learts-mb-n30">
                                <div className="col-12 learts-mb-30">
                                    <div className="row learts-mb-n10">
                                        <div className="col-lg-2 col-md-3 col-12 learts-mb-10">
                                            <img src="assets/images/brands/brand-3.webp" alt="" />
                                        </div>
                                        <div className="col learts-mb-10">
                                            <p>
                                                We’ve worked with numerous industries and famous fashion brands around the world. We have also created tremendous impacts on fashion
                                                manufacturing and online sales. When we partner with an eCommerce agency, we connect every activity to set the trend and win
                                                customers’ trust. We make sure our customers are always happy with our products.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 learts-mb-30">
                                    <div className="row learts-mb-n10">
                                        <div className="col-lg-2 col-md-3 col-12 learts-mb-10">
                                            <img src="assets/images/brands/brand-8.webp" alt="" />
                                        </div>
                                        <div className="col learts-mb-10">
                                            <p>
                                                Prior to Houdini, there have been many clothing brands that achieved such a roaring success. However, there’s no other brand that
                                                can obtain such a precious position like us. We have successfully built our site to make more people know about our products as well
                                                as our motto. We’ve been the inspiration for many other small and medium-sized businesses.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-additional_information">
                            <div className="row">
                                <div className="col-lg-8 col-md-10 col-12 mx-auto">
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td>Size</td>
                                                    <td>Large, Medium, Small</td>
                                                </tr>
                                                <tr>
                                                    <td>Color</td>
                                                    <td>Black, White</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="section section-padding">
                <div className="container">
                    <div className="section-title2 text-center">
                        <h2 className="title">You Might Also Like</h2>
                    </div>
                    <div className="product-carousel">
                        <div className="col">
                            <div className="product">
                                <div className="product-thumb">
                                    <a href="product-details.html" className="image">
                                        <span className="product-badges">
                                            <span className="onsale">-13%</span>
                                        </span>
                                        <img src="assets/images/product/s270/product-1.webp" alt="Product Image" />
                                        <img className="image-hover " src="assets/images/product/s270/product-1-hover.webp" alt="Product Image" />
                                    </a>
                                    <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                        <i className="far fa-heart" />
                                    </a>
                                </div>
                                <div className="product-info">
                                    <h6 className="title">
                                        <a href="product-details.html">Boho Beard Mug</a>
                                    </h6>
                                    <span className="price">
                                        <span className="old">$45.00</span>
                                        <span className="new">$39.00</span>
                                    </span>
                                    <div className="product-buttons">
                                        <a href="#quickViewModal" data-bs-toggle="modal" className="product-button hintT-top" data-hint="Quick View">
                                            <i className="fas fa-search" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Add to Cart">
                                            <i className="fas fa-shopping-cart" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Compare">
                                            <i className="fas fa-random" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="product">
                                <div className="product-thumb">
                                    <a href="product-details.html" className="image">
                                        <img src="assets/images/product/s270/product-2.webp" alt="Product Image" />
                                        <img className="image-hover " src="assets/images/product/s270/product-2-hover.webp" alt="Product Image" />
                                    </a>
                                    <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                        <i className="far fa-heart" />
                                    </a>
                                </div>
                                <div className="product-info">
                                    <h6 className="title">
                                        <a href="product-details.html">Motorized Tricycle</a>
                                    </h6>
                                    <span className="price">$35.00</span>
                                    <div className="product-buttons">
                                        <a href="#quickViewModal" data-bs-toggle="modal" className="product-button hintT-top" data-hint="Quick View">
                                            <i className="fas fa-search" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Add to Cart">
                                            <i className="fas fa-shopping-cart" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Compare">
                                            <i className="fas fa-random" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="product">
                                <div className="product-thumb">
                                    <span className="product-badges">
                                        <span className="hot">hot</span>
                                    </span>
                                    <a href="product-details.html" className="image">
                                        <img src="assets/images/product/s270/product-3.webp" alt="Product Image" />
                                        <img className="image-hover " src="assets/images/product/s270/product-3-hover.webp" alt="Product Image" />
                                    </a>
                                    <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                        <i className="far fa-heart" />
                                    </a>
                                </div>
                                <div className="product-info">
                                    <h6 className="title">
                                        <a href="product-details.html">Walnut Cutting Board</a>
                                    </h6>
                                    <span className="price">$100.00</span>
                                    <div className="product-buttons">
                                        <a href="#quickViewModal" data-bs-toggle="modal" className="product-button hintT-top" data-hint="Quick View">
                                            <i className="fas fa-search" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Add to Cart">
                                            <i className="fas fa-shopping-cart" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Compare">
                                            <i className="fas fa-random" />
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
                                            <span className="onsale">-27%</span>
                                        </span>
                                        <img src="assets/images/product/s270/product-4.webp" alt="Product Image" />
                                        <img className="image-hover " src="assets/images/product/s270/product-4-hover.webp" alt="Product Image" />
                                    </a>
                                    <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                        <i className="far fa-heart" />
                                    </a>
                                </div>
                                <div className="product-info">
                                    <h6 className="title">
                                        <a href="product-details.html">Pizza Plate Tray</a>
                                    </h6>
                                    <span className="price">
                                        <span className="old">$30.00</span>
                                        <span className="new">$22.00</span>
                                    </span>
                                    <div className="product-buttons">
                                        <a href="#quickViewModal" data-bs-toggle="modal" className="product-button hintT-top" data-hint="Quick View">
                                            <i className="fas fa-search" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Add to Cart">
                                            <i className="fas fa-shopping-cart" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Compare">
                                            <i className="fas fa-random" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="product">
                                <div className="product-thumb">
                                    <a href="product-details.html" className="image">
                                        <img src="assets/images/product/s270/product-5.webp" alt="Product Image" />
                                        <img className="image-hover " src="assets/images/product/s270/product-5-hover.webp" alt="Product Image" />
                                    </a>
                                    <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                        <i className="far fa-heart" />
                                    </a>
                                    <div className="product-options">
                                        <ul className="colors">
                                            <li style={{ backgroundColor: '#c2c2c2' }}>color one</li>
                                            <li style={{ backgroundColor: '#374140' }}>color two</li>
                                            <li style={{ backgroundColor: '#8ea1b2' }}>color three</li>
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
                                        <a href="product-details.html">Minimalist Ceramic Pot</a>
                                    </h6>
                                    <span className="price">$120.00</span>
                                    <div className="product-buttons">
                                        <a href="#quickViewModal" data-bs-toggle="modal" className="product-button hintT-top" data-hint="Quick View">
                                            <i className="fas fa-search" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Add to Cart">
                                            <i className="fas fa-shopping-cart" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Compare">
                                            <i className="fas fa-random" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="product">
                                <div className="product-thumb">
                                    <a href="product-details.html" className="image">
                                        <img src="assets/images/product/s270/product-6.webp" alt="Product Image" />
                                        <img className="image-hover " src="assets/images/product/s270/product-6-hover.webp" alt="Product Image" />
                                    </a>
                                    <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                        <i className="far fa-heart" />
                                    </a>
                                </div>
                                <div className="product-info">
                                    <h6 className="title">
                                        <a href="product-details.html">Clear Silicate Teapot</a>
                                    </h6>
                                    <span className="price">$140.00</span>
                                    <div className="product-buttons">
                                        <a href="#quickViewModal" data-bs-toggle="modal" className="product-button hintT-top" data-hint="Quick View">
                                            <i className="fas fa-search" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Add to Cart">
                                            <i className="fas fa-shopping-cart" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Compare">
                                            <i className="fas fa-random" />
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
                                        <img src="assets/images/product/s270/product-7.webp" alt="Product Image" />
                                        <img className="image-hover " src="assets/images/product/s270/product-7-hover.webp" alt="Product Image" />
                                    </a>
                                    <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                        <i className="far fa-heart" />
                                    </a>
                                </div>
                                <div className="product-info">
                                    <h6 className="title">
                                        <a href="product-details.html">Lucky Wooden Elephant</a>
                                    </h6>
                                    <span className="price">$35.00</span>
                                    <div className="product-buttons">
                                        <a href="#quickViewModal" data-bs-toggle="modal" className="product-button hintT-top" data-hint="Quick View">
                                            <i className="fas fa-search" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Add to Cart">
                                            <i className="fas fa-shopping-cart" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Compare">
                                            <i className="fas fa-random" />
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
                                                <i className="far fa-frown" />
                                            </span>
                                            <span className="hot">hot</span>
                                        </span>
                                        <img src="assets/images/product/s270/product-8.webp" alt="Product Image" />
                                        <img className="image-hover " src="assets/images/product/s270/product-8-hover.webp" alt="Product Image" />
                                    </a>
                                    <a href="wishlist.html" className="add-to-wishlist hintT-left" data-hint="Add to wishlist">
                                        <i className="far fa-heart" />
                                    </a>
                                    <div className="product-options">
                                        <ul className="colors">
                                            <li style={{ backgroundColor: '#000000' }}>color one</li>
                                            <li style={{ backgroundColor: '#b2483c' }}>color two</li>
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
                                        <a href="product-details.html">Decorative Christmas Fox</a>
                                    </h6>
                                    <span className="price">$50.00</span>
                                    <div className="product-buttons">
                                        <a href="#quickViewModal" data-bs-toggle="modal" className="product-button hintT-top" data-hint="Quick View">
                                            <i className="fas fa-search" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Add to Cart">
                                            <i className="fas fa-shopping-cart" />
                                        </a>
                                        <a href="#" className="product-button hintT-top" data-hint="Compare">
                                            <i className="fas fa-random" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}

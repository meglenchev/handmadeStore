import { Link } from 'react-router';

export function ProductSkeleton() {
    return (
        <>
            <div className="page-title-section section">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="page-title">
                                <h1 className="title">Shop</h1>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/products">Products</Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <span className="skeleton-blur" style={{ width: '120px', height: '16px' }}></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section section-padding border-bottom">
                <div className="container">
                    <div className="row learts-mb-n40">
                        <div className="col-lg-6 col-12 learts-mb-40">
                            <div className="product-images">
                                <div className="product-gallery-slider">
                                    <div className="skeleton-blur" style={{ width: '100%', height: '540px', display: 'block' }}></div>
                                </div>
                                <div className="product-thumb-slider" style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                                    {[1, 2, 3, 4].map((item) => (
                                        <div key={item} className="skeleton-blur" style={{ width: '100px', height: '130px' }}></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-12 learts-mb-40">
                            <div className="product-summery">
                                <h3 className="product-title" style={{ marginTop: '20px' }}>
                                    <span className="skeleton-blur" style={{ width: '65%', height: '32px' }}></span>
                                </h3>

                                <div className="product-price">
                                    <span className="skeleton-blur" style={{ width: '35%', height: '24px' }}></span>
                                </div>

                                <div className="product-description">
                                    <span className="skeleton-blur" style={{ width: '100%', height: '14px', marginBottom: '8px' }}></span>
                                    <span className="skeleton-blur" style={{ width: '95%', height: '14px', marginBottom: '8px' }}></span>
                                    <span className="skeleton-blur" style={{ width: '60%', height: '14px' }}></span>
                                </div>

                                <div style={{ margin: '30px 0' }}>
                                    <span className="skeleton-blur" style={{ width: '100%', height: '50px' }}></span>
                                </div>

                                <div className="product-buttons" style={{ display: 'flex', gap: '10px' }}>
                                    <span className="skeleton-blur" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></span>
                                    <span className="skeleton-blur" style={{ width: '200px', height: '50px' }}></span>
                                </div>

                                <div className="product-meta" style={{ marginTop: '40px' }}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="label">
                                                    <span>SKU</span>
                                                </td>
                                                <td className="value">
                                                    <span className="skeleton-blur" style={{ width: '80px', height: '14px' }}></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="label">
                                                    <span>Category</span>
                                                </td>
                                                <td className="value">
                                                    <span className="skeleton-blur" style={{ width: '60px', height: '14px' }}></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="label">
                                                    <span>Tags</span>
                                                </td>
                                                <td className="value">
                                                    <span className="skeleton-blur" style={{ width: '100px', height: '14px' }}></span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
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
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '10px' }}>
                                        <span className="skeleton-blur" style={{ width: '100%', height: '16px' }}></span>
                                        <span className="skeleton-blur" style={{ width: '98%', height: '16px' }}></span>
                                        <span className="skeleton-blur" style={{ width: '95%', height: '16px' }}></span>
                                        <span className="skeleton-blur" style={{ width: '40%', height: '16px' }}></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

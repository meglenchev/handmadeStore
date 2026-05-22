import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function QuickViewVariations({ size, stock, handleMinus, handlePlus, quantity }) {
    return (
        <div className="product-variations">
            <table>
                <tbody>
                    {size.length > 0 && (
                        <tr>
                            <td className="label">
                                <span>Размер</span>
                            </td>
                            <td className="value">
                                <div className="product-sizes">
                                    {size.map((s) => (
                                        <button type="button" key={s}>
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    )}
                    {stock > 1 && (
                        <tr>
                            <td className="label">
                                <span>Количество</span>
                            </td>
                            <td className="value">
                                <div className="product-quantity">
                                    <span onClick={handleMinus} className="qty-btn minus">
                                        <FontAwesomeIcon icon="minus" />
                                    </span>
                                    <input type="text" className="input-qty" value={quantity} readOnly />
                                    <span onClick={handlePlus} className="qty-btn plus">
                                        <FontAwesomeIcon icon="plus" />
                                    </span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

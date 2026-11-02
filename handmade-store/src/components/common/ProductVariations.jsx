import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ProductVariations({
    size,
    stock,
    handleMinus,
    handlePlus,
    quantity,
    inCartQuantity,
}) {
    return (
        <div className="product-variations">
            <table>
                <tbody>
                    {size?.length > 0 && (
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
                                    <button
                                        type="button"
                                        onClick={handleMinus}
                                        className="qty-btn minus"
                                        disabled={quantity <= 1}>
                                        <FontAwesomeIcon icon="minus" />
                                    </button>
                                    <input
                                        type="text"
                                        className="input-qty"
                                        value={quantity}
                                        readOnly
                                    />
                                    <button
                                        type="button"
                                        onClick={handlePlus}
                                        className="qty-btn plus"
                                        disabled={inCartQuantity >= stock || quantity >= stock}>
                                        <FontAwesomeIcon icon="plus" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

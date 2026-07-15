import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ProductShare({ productUrl, productTitle, productImage }) {
    const encodingUrl = encodeURIComponent(productUrl || window.location.href);
    const encodingTitle = encodeURIComponent(productTitle || 'Виж този страхотен продукт!');
    const encodingImage = encodeURIComponent(productImage || '');

    const facebookShareUrl = `https://facebook.com/sharer/sharer.php?u=${encodingUrl}`;
    const pinterestShareUrl = `https://pinterest.com/pin/create/button/?url=${encodingUrl}&media=${encodingImage}&description=${encodingTitle}`;
    const emailShareUrl = `mailto:?subject=${encodingTitle}&body=Виж%20този%20продукт%20тук:%20${encodingUrl}`;

    const openShareWindow = (e, url) => {
        e.preventDefault();
        window.open(url, 'share-dialog', 'width=600,height=400,scrollbars=yes');
    };

    return (
        <div className="product-share">
            {/* 
                ВАЖНО ЗА БЪДЕЩА ИМПЛЕМЕНТАЦИЯ (След качване на реален хостинг и домейн):
                За да може Facebook да зареди правилно картинката, заглавието и описанието на продукта, 
                трябва да се използва динамично инжектиране на мета тагове (Open Graph) през Node.js бекенда.

                Как работи:
                Когато роботът на Facebook поиска продуктов линк (напр. '/products/:id/details'), 
                Node.js сървърът трябва да прехване заявката, да вземе данните за продукта от базата данни, 
                да попълни динамично <meta> таговете в основния 'index.html' файл и едва тогава 
                да върне готовия HTML към Facebook, за да се генерира перфектно превю при споделяне.
            */}
            <a href={facebookShareUrl} onClick={(e) => openShareWindow(e, facebookShareUrl)} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={['fab', 'facebook-f']} />
            </a>
            <a href={pinterestShareUrl} onClick={(e) => openShareWindow(e, pinterestShareUrl)} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={['fab', 'pinterest']} />
            </a>
            <a href={emailShareUrl} onClick={(e) => openShareWindow(e, emailShareUrl)} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon="envelope" />
            </a>
        </div>
    );
}

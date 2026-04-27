import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: 'block', color: 'black', fontSize: '30px', right: '0' }} onClick={onClick}>
            <FontAwesomeIcon icon="angle-right" />
        </div>
    );
};

export const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style, display: 'block', color: 'black', fontSize: '30px', left: '10px' }} onClick={onClick}>
            <FontAwesomeIcon icon="angle-left" />
        </div>
    );
};

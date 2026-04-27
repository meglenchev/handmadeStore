import { NavLink } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FOOTER_LINKS = [
    { to: '/about-us', label: 'За нас' },
    { to: '/contact-us', label: 'Контакти' },
    { to: '/support', label: 'Поддръжка' },
    { to: '/privacy-policy', label: 'Политика за сигурност' },
    { to: '/faq', label: 'Често задавани въпроси' },
];

const SOCIAL_LINKS = [
    { href: 'https://www.facebook.com/', icon: ['fab', 'facebook-f'], hint: 'Facebook' },
    { href: 'https://www.instagram.com/', icon: ['fab', 'instagram'], hint: 'Instagram' },
    { href: 'https://www.youtube.com/', icon: ['fab', 'youtube'], hint: 'Youtube' },
];

export function Footer() {
    const handleSubscribe = (e) => {
        e.preventDefault();
        // Implement subscription logic here, e.g., send email to backend or integrate with Mailchimp API
    };

    return (
        <footer className="section section-padding bg-light">
            <div className="container">
                <div className="row text-center row-cols-1">
                    <div className="footer1-logo col text-center">
                        <img src="../../assets/images/logo/logo.webp" alt="" />
                    </div>
                    <div className="footer1-menu col">
                        <ul className="widget-menu justify-content-center">
                            {FOOTER_LINKS.map((link) => (
                                <li key={link.to}>
                                    <NavLink to={link.to}>{link.label}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="footer-subscribe d-flex flex-column col">
                        <form id="mc-form" className="mc-form widget-subscibe">
                            <input id="mc-email" autoComplete="off" type="email" placeholder="Въведете вашия имейл адрес" />
                            <button onClick={handleSubscribe} id="mc-submit" className="btn btn-dark">
                                Абонирайте се
                            </button>
                        </form>
                        {/* mailchimp-alerts Start */}
                        <div className="mailchimp-alerts text-centre">
                            <div className="mailchimp-submitting" />
                            {/* mailchimp-submitting end */}
                            <div className="mailchimp-success text-success" />
                            {/* mailchimp-success end */}
                            <div className="mailchimp-error text-danger" />
                            {/* mailchimp-error end */}
                        </div>
                        {/* mailchimp-alerts end */}
                    </div>
                    <div className="footer1-social col">
                        <ul className="widget-social justify-content-center">
                            {SOCIAL_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={link.icon} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="footer1-copyright col">
                        <p className="copyright">
                            © 2023 learts. All Rights Reserved | <strong>(+00) 123 567990</strong> |<a href="mailto:contact@learts.com">contact@learts.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

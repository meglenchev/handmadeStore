import { NavLink } from 'react-router';

export const NavigationLinks = ({ links, onItemClick }) => {
    return (
        <ul>
            {links.map((link, index) => (
                <li key={index}>
                    <NavLink to={link.to} onClick={onItemClick}>
                        <span className="menu-text">{link.label}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

import { NavLink } from 'react-router';

export const NavigationLinks = ({ links, onItemClick }) => {
    return (
        <ul>
            {links.map((link) => (
                <li key={link.to}>
                    <NavLink to={link.to} onClick={onItemClick}>
                        <span className="menu-text">{link.label}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

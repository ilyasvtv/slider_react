import { useState } from "react";
import "./Header.sass";
   
export default function Header() {
    const headerELements = [
        ["temp 1", ["string 1", "string 2", "string 3"], ["string 1", "string 2", "string 3"]],
        ["temp 2", ["string 11"], ["string 1", "string 2", "string 3"]],
        ["temp 3", ["string 111", "string 2"], ["string 1", "string 2", "string 3", "string 4", "string 5"]],
        ["temp 4", ["string 1111", "string 2", "string 3", "string 4", "string 5"], ["string 1", "string 2"]],
        ["temp 5", ["string 1", "string 2"], ["string 1"]]
    ];

    const [hoveredHeaderItem, setHoveredHeaderItem] = useState(false);
    const [statusOfHover, setStatusOfHover] = useState(false);

    const displayOfHeaderSubMenu = (i) => {
        // setStatusOfHover(!!i)
        const bool_val = i === false ? false : true;
        setStatusOfHover(bool_val);
        setHoveredHeaderItem(i);
    }

    return(
        <header className="header">
                <div className="container">
                    <div className="menu-wrap" onMouseLeave={() => displayOfHeaderSubMenu(false)}>
                        <ul className="header-menu">
                            {headerELements.map((content, i) => {
                                return <li className="header-menu__item"
                                            onMouseEnter={() => displayOfHeaderSubMenu(i)}
                                            key={i}>{content[0]}
                                        </li>
                            })}
                        </ul>

                        {statusOfHover && 
                        <div className="sub-menu">
                            <ul className="sub-menu__list">
                                {headerELements[hoveredHeaderItem][1].map((item, i) => {
                                    return <li key={i} className="sub-menu__item">
                                                <a href="#">{item}</a>
                                            </li>
                                })}
                            </ul>

                            <ul className="sub-menu__list">
                                {headerELements[hoveredHeaderItem][2].map((item, i) => {
                                    return <li key={i} className="sub-menu__item">
                                                <a href="#">{item}</a>
                                            </li>
                                })}
                            </ul>
                        </div>}
                    </div>
                </div>
        </header> 
    )
}
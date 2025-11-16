import { Link } from "react-router-dom";
import { PAGES } from "../views";

function Header() {
  return (
    <header className="header-cotainer-i">
      <div className="header">
        <h1 className="logo">CMS</h1>
        <ul className="menu">
          <Link className="item" to={PAGES.PAGE_1}>
            HOME
          </Link>
          <Link className="item" to={PAGES.PAGE_2}>
            COMPANY
          </Link>
          <Link className="item" to={PAGES.PAGE_3}>
            OFFER
          </Link>
          <Link className="item" to={PAGES.PAGE_4}>
            CONTACT
          </Link>
          <Link className="item" to={PAGES.ADMIN}>
            ADMIN
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;

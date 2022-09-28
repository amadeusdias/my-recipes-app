import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../css/footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const EIGHT = 8;
  const history = useHistory();
  const pathName = `${history.location.pathname}`;
  const [renderFooter, setRenderFooter] = useState(true);
  useEffect(() => {
    if (!(pathName.length > 1 && pathName.length <= EIGHT)) {
      setRenderFooter(false);
    }
  }, []);
  return (
    renderFooter && (
      <footer className="footer" data-testid="footer">
        <Link to="/drinks">
          <button type="button">
            <img
              src={ drinkIcon }
              alt="drinkIcon"
              data-testid="drinks-bottom-btn"
            />
          </button>
        </Link>
        <Link to="/meals">
          <button type="button">
            <img
              src={ mealIcon }
              alt="mealIcon"
              data-testid="meals-bottom-btn"
            />
          </button>
        </Link>
      </footer>
    )
  );
}

export default Footer;

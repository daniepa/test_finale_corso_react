import { Link, NavLink } from 'react-router';
import './Menu.css';
import DarkLight from '../DarkLight/DarkLight';
import Counter from '../Counter/Counter';

export default function Menu() {
  return (
    <>
      <ul className="menu">
        <li>
          <NavLink to="/">home</NavLink>
        </li>
        <li>
          <NavLink to="/favorite">favorite</NavLink>
        </li>
      </ul>
      <DarkLight />
      <Counter />
    </>
  );
}

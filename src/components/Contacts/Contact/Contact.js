import PropTypes from "prop-types";
import s from "./Contact.module.css";

const Contact = ({ name, number, id, onDeleteContact }) => {
  return (
    <li className={s.item}>
      <p className={s.name}>{name}</p>
      <p className={s.name}>{number}</p>
      <button
        className={s.btn}
        type="button"
        onClick={() => onDeleteContact(id)}
      >
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default Contact;

import PropTypes from "prop-types";

const Button = ({ children, variant = "primary", onClick, ...rest }) => {
  const getButtonClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-md";
      case "secondary":
        return "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md";
      case "danger":
        return "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md";
      default:
        return "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md";
    }
  };

  return (
    <button className={getButtonClasses()} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  onClick: PropTypes.func,
};

export default Button;

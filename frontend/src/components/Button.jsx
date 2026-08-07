import React from "react";

const Button = ({
  name,
  onClick,
  variant = "primary",
  className = "",
}) => {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100",

    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-5
        py-2.5
        rounded-xl
        font-medium
        transition-all
        duration-300
        shadow-sm
        hover:shadow-lg
        cursor-pointer
        ${variants[variant]}
        ${className}
      `}
    >
      {name}
    </button>
  );
};

export default Button;

const Tooltip= ({
  children,
  text,
  position = "bottom",
  delay = 100,
  className = "",
}) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className={`relative inline-flex group ${className}`}
      aria-label={text}
      role="tooltip"
    >
      {children}
      <div
        className={`pointer-events-none absolute z-50 w-max min-w-[80px] max-w-[200px] scale-95 transform rounded-md bg-gray-800 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 ${positionClasses[position]}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {text}
        <div
          className={`absolute h-2 w-2 rotate-45 bg-gray-800 ${
            position === "top" ? "-bottom-1 left-1/2 -translate-x-1/2" : ""
          } ${
            position === "bottom" ? "-top-1 left-1/2 -translate-x-1/2" : ""
          } ${position === "left" ? "-right-1 top-1/2 -translate-y-1/2" : ""} ${
            position === "right" ? "-left-1 top-1/2 -translate-y-1/2" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default Tooltip;

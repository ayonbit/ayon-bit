const Tooltip = ({ children, text }) => {
  return (
    <div className="relative group inline-block" aria-label={text}>
      {children}
      <div className="pointer-events-none absolute top-full left-1/2 z-50 mt-2 w-max -translate-x-1/2 scale-95 transform rounded-md bg-black px-2 py-1 text-xs text-white opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100 group-hover:scale-100">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;


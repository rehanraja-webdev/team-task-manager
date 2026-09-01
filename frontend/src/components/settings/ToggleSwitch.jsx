const ToggleSwitch = ({
  checked,
  onChange,
  disabled = false,
  label,
  description,
}) => {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <h3 className="text-slate-900 dark:text-white font-medium">{label}</h3>

        {description && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 cursor-pointer
          ${checked ? "bg-indigo-600" : "bg-slate-700"}
          ${disabled && "opacity-50 cursor-not-allowed"}
        `}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300
            ${checked ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;

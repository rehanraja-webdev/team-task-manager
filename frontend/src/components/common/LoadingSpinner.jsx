const LoadingSpinner = ({ color = "border-t-black dark:border-t-white" }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <span
        className={`inline-block h-[67.2px] w-[67.2px] animate-spin rounded-full border-[4.2px] border-solid border-r-transparent ${color}`}
      />
    </div>
  );
};

export default LoadingSpinner;

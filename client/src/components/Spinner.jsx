const Spinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center position-fixed top-0 left-0 w-100 h-100 bg-dark bg-opacity-75"
      style={{ zIndex: 9998, backdropFilter: "blur(6px)" }}
    >
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;

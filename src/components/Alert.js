
const Alert = ({ message = "Error", isError = true }) => {

  return (
    <div
    style={{
      zIndex: 100000
    }}
      className={`fixed duration-150 top-5 w-10/12 alert text-center px-7 py-2 rounded-full left-1/2 transform -translate-x-1/2 ${
        isError ? "bg-red-500" : "bg-green-500"
      } text-white`}
    >
      {message}
    </div>
  );
};

export default Alert;

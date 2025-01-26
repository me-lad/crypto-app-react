import { useEffect, useState } from "react";

function ErrorModal({ errors, setErrors }) {
  const [counter, setCounter] = useState(60);
  useEffect(() => {
    document.getElementById("my_modal_3").showModal();
    if (!errors.includes("You've exceeded the Rate Limit. Please try after"))
      return;
    const interval = setInterval(() => {
      setCounter((counter) => {
        if (counter === 0) {
          clearInterval(interval);
          return 0;
        } else {
          return counter - 1;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 w-screen backdrop-blur-sm transition-all duration-300"
      style={{ zIndex: "100" }}
    >
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              onClick={() => setErrors([])}
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 !outline-0"
            >
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold">Something Went Wrong !</h3>
          <ul className="py-4">
            {errors.map((error, index) => (
              <li key={index}>
                {error ===
                "You've exceeded the Rate Limit. Please try after" ? (
                  <span className="countdown flex items-center gap-2">
                    {error}
                    <span style={{ "--value": counter }}></span>
                  </span>
                ) : (
                  error
                )}
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </div>
  );
}

export default ErrorModal;

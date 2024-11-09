// src/Scroller.js
import "./CustomScrollBar.css";
const Scroller = () => {
  // const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

  return (
    <div className="overflow-x-auto whitespace-nowrap custom-scrollbar">
      <div className="inline-flex space-x-4 p-4">
        {/* {items.map((item, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white p-4 rounded shadow-md"
          >
            {item}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Scroller;

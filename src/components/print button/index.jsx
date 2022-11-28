import { useEffect, useRef } from "react";
import { AiTwotonePrinter } from "react-icons/ai";
import { FaFileExcel } from "react-icons/fa";
import { jsonToPdf } from "../../helpers";
import "./printButton.css";

const PrintButton = ({ name, columns = [], content = [] }) => {
  const printRef = useRef();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      scrollY > 0
        ? printRef.current?.classList.add("show-print__btn")
        : printRef.current?.classList.remove("show-print__btn");
    });
  });
  return (
    <div
      className="row flex-column align-content-between mx-auto  print-btn"
      ref={printRef}
    >
      <button className=" btn btn-info no-print px-4" onClick={window.print}>
        <AiTwotonePrinter /> Print
      </button>

      <button
        className=" btn btn-info no-print px-4 mt-4"
        onClick={() => content.length > 0 && jsonToPdf(name, columns, content)}
      >
        <FaFileExcel /> Export
      </button>
    </div>
  );
};

export default PrintButton;

import React from "react";
import axios from "axios";
var fileDownload = require("js-file-download");

function DownloadInvoice() {
  const downloadInvoice = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .get("http://localhost:5000/api/create-invoice", {
          responseType: "blob",
        })
        .then((res) => {
          fileDownload(res.data, "invoice.pdf");
        });

      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={downloadInvoice}>
      <button className="downloadInvoice">Download Invoice</button>
    </form>
  );
}

export default DownloadInvoice;

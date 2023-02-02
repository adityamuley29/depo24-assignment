const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  //   generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    // .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("DEPO24", 50, 57)
    .fontSize(10)
    .text("Depo Solutions Private Limited", 210, 50, { align: "left" })
    .text("77/1/A, Christopher Road, Topsia,", 210, 63, {
      align: "left",
    })
    .text("Kolkata - 700046", 210, 77, {
      align: "left",
    })
    .text("West Bengal", 210, 92, { align: "left" })
    .text("GSTIN: 19AAJCD1058P1Z4", 210, 106, { align: "left" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    // .font("Helvetica-Bold")
    // .text(invoice.invoice_nr, 150, customerInformationTop)
    // .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    // .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    // .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    // .text(invoice.shipping.address, 300, customerInformationTop + 15)
    // .text(
    //   invoice.shipping.city +
    //     ", " +
    //     invoice.shipping.state +
    //     ", " +
    //     invoice.shipping.country,
    //   300,
    //   customerInformationTop + 30
    // )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "DSIN",
    "System Listing Name",
    "MRP",
    "HSN Code",
    "GST slab",
    "Unit"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.length; i++) {
    const item = invoice[i];
    const position = invoiceTableTop + (i + 1) * 50;
    generateTableRow(
      doc,
      position,
      item.dsin,
      item.system_listing_name,
      item.mrp,
      item.hsn_code,
      item.gst_slab,
      item.unit
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 50;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const duePosition = subtotalPosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Total",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  dsin,
  system_listing_name,
  mrp,
  hsn_code,
  gst_slab,
  unit
) {
  doc
    .fontSize(10)
    .text(dsin, 50, y)
    .text(system_listing_name, 150, y, { width: 150 })
    .text(mrp, 300, y, { width: 40, align: "right" })
    .text(hsn_code, 370, y, { width: 60, align: "right" })
    .text(gst_slab, 450, y, { width: 60 })
    .text(unit, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice,
};

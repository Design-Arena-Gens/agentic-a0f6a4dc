import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { utils, writeFile } from 'xlsx';

export const exportToPDF = (title, headers, rows) => {
  const doc = new jsPDF();
  doc.text(title, 14, 16);
  autoTable(doc, {
    startY: 24,
    head: [headers],
    body: rows
  });
  doc.save(`${title.replace(/\s+/g, '_').toLowerCase()}.pdf`);
};

export const exportToXLSX = (title, headers, rows) => {
  const worksheet = utils.json_to_sheet(
    rows.map((row) =>
      headers.reduce((acc, header, index) => {
        acc[header] = row[index];
        return acc;
      }, {})
    )
  );
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Report');
  writeFile(workbook, `${title.replace(/\s+/g, '_').toLowerCase()}.xlsx`);
};

const { exec } = require("child_process");
const path = require("path");

async function convertToPDF(inputPath, outputDir) {
  return new Promise((resolve, reject) => {
    const command = `"C:/Program Files/LibreOffice/program/soffice.exe" --headless --convert-to pdf "${inputPath}" --outdir "${outputDir}"`;

    exec(command, (error) => {
      if (error) {
        console.error("Konversi gagal:", error);
        reject(error);
      } else {
        const filename = path.basename(inputPath).replace(path.extname(inputPath), ".pdf");
        resolve(path.join(outputDir, filename));
      }
    });
  });
}

module.exports = {
  convertToPDF,
};

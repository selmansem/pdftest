const pdfParser = require("pdf-parse");
const fs = require("fs");

// Path to the directory containing the PDFs
const target = "./pdfs";

/**
 * Test if a file is a valid PDF
 * @param {string} file Path to the file
 * @returns {boolean} True if the file is a valid PDF, false otherwise
 */
async function testFile(file) {
    // First, check if the file exists
    if (!fs.existsSync(file)) {
        return false;
    } else {
        try {
            let bufferData = fs.readFileSync(file);
            const data = await pdfParser(bufferData);
            return true;
        } catch (error) {
            return false;
        }
    }
}

(async () => {
    var i = 10; // Limit to 10 attempts to prevent infinite loop
    while (!(await testFile(`${target}/corrupted.pdf`))) {
        i--;
        console.log(`${(i - 10) * -1}. No se pudo leer el archivo`);

        if (i === 0) {
            break;
        }
    }
})();

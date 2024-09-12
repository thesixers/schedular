// Grab elements from the DOM
const fileInput = document.getElementById('file-input');
const canvas = document.getElementById('pdf-render');
const ctx = canvas.getContext('2d');

// Load the PDF.js library
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

// Handle file upload
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];

  if (file.type !== 'application/pdf') {
    alert('Please upload a PDF file.');
    return;
  }

  const fileReader = new FileReader();

  fileReader.onload = function() {
    const pdfData = new Uint8Array(this.result);

    // Load the PDF
    pdfjsLib.getDocument(pdfData).promise.then(pdf => {
      console.log('PDF loaded');
      
      // Fetch the first page
      pdf.getPage(1).then(page => {
        console.log('Page loaded');

        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into the canvas context
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        page.render(renderContext);
      });
    });
  };

  fileReader.readAsArrayBuffer(file);
});

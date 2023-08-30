// Función para realizar el POST request al servidor

function enviarArchivoPDF() {
    // Crea un objeto FormData y agrega el archivo PDF que deseas enviar

    var formData = new FormData();
    formData.append("pdfFile", document.getElementById("pdfFileInput").files[0]);
    formData.append("pages", document.getElementById("pages").value);

    // Realiza el POST request al servidor utilizando fetch

    fetch("/upload_pdf", {
        method: "POST",
        body: formData
    })

    .then(response => response.blob())

    .then(blob => {
        // Genera un enlace para descargar el archivo CSV
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "datos.csv";
        a.click();
        // Libera el objeto URL creado para evitar pérdidas de memoria
        URL.revokeObjectURL(url);
    })

    .catch(error => {
        // Manejo de errores en caso de que ocurra un problema con el fetch
        console.error(error);
    });
}

function enviarArchivoCSV() {
    const fileInput = document.getElementById('csvFileInput');
    const tipoSelect = document.getElementById('proveedor');

    const selectedFile = fileInput.files[0];
    const selectedTipo = tipoSelect.value;

    if (selectedFile) {
        const formData = new FormData();
        formData.append('csvFile', selectedFile);
        formData.append('proveedor', selectedTipo);

        fetch('/upload_csv', {
            method: 'POST',
            body: formData
        })

        .then(response => response.blob())
        .then(blob => {
            // Genera un enlace para descargar el archivo CSV
            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = "import.txt";
            a.click();
            // Libera el objeto URL creado para evitar pérdidas de memoria
            URL.revokeObjectURL(url);
        })

        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        console.log('No se ha seleccionado un archivo CSV.');
    }
}

function downloadProductos(){
    fetch("/download/productos")
    .then(response => response.blob())
    .then(blob => {
        // Genera un enlace para descargar el archivo CSV
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "productos.csv";
        a.click();
        // Libera el objeto URL creado para evitar pérdidas de memoria
        URL.revokeObjectURL(url);
    })
}
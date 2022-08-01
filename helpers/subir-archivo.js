const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (
	files,
	extensionesValidas = ["png", "jpg", "jpeg", "gif"],
	carpeta = ""
) => {
	return new Promise((resolve, reject) => {
		// VALIDAR NOMBRE ARCHIVO
		const { archivo } = files;

		// ERROR ENVIA UNDEFINED
		// console.log({ archivo }); 

		const nombreCortado = archivo.name.split(".");
		const extension = nombreCortado[nombreCortado.length - 1];

		if (!extensionesValidas.includes(extension)) {
			return reject(
				`La extensión '${extension}' no es permitida. Extensiones válidas: ${extensionesValidas}`
			);
		}

		// GENERAR NOMBRE
		const nombreTemp = uuidv4() + "." + extension;

		// GENERAR LA RUTA
		const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

		// MOVER ARCHIVO
		archivo.mv(uploadPath, (err) => {
			if (err) {
				reject(err);
			}

			resolve(nombreTemp);
		});
	});
};

module.exports = {
	subirArchivo,
};

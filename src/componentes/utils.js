// ============================================================
// UTILIDADES COMPARTIDAS
// ============================================================

// La columna `columnajson` es de tipo JSON en MySQL. Sequelize/mysql2
// la devuelven YA convertida en objeto JavaScript, por lo que llamar a
// JSON.parse() sobre ella lanzaba una excepción y la pregunta se veía
// vacía. Esta función acepta tanto objetos como cadenas y nunca rompe.
export function parseColumnaJson(valor) {
    if (!valor) return {};
    if (typeof valor === "object") return valor;
    try {
        return JSON.parse(valor);
    } catch (e) {
        console.error("No se pudo interpretar columnajson:", e);
        return {};
    }
}

// Placeholder NEGRO de 150x150 embebido como data URI (SVG). Funciona
// sin conexión: reemplaza al antiguo https://via.placeholder.com/150,
// que dejó de estar disponible y dejaba las imágenes rotas.
export const PLACEHOLDER_NEGRO =
    "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='150'%20height='150'%3E%3Crect%20width='150'%20height='150'%20fill='%23000000'/%3E%3C/svg%3E";

// Resuelve la ruta de una imagen.
//   - vacía o apuntando al servicio caído via.placeholder.com -> cuadro negro
//   - URL absoluta (http/https) -> se usa tal cual
//   - ruta relativa -> se le antepone el backend
export function resolverImagen(ruta) {
    if (!ruta || /via\.placeholder\.com/i.test(ruta)) return PLACEHOLDER_NEGRO;
    if (/^https?:\/\//i.test(ruta)) return ruta;
    return `http://localhost:8080${ruta}`;
}

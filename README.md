# Los 12 Mundos · Web

Web estática (HTML + CSS + JS, sin dependencias ni build) para **Los 12 Mundos**, cajas temáticas para guarderías y escuelas infantiles.

## Ver en local

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

También se puede publicar tal cual en GitHub Pages, Netlify, Vercel, etc.

## Editar precios y productos

Todo está en **`js/products.js`**:

- `price`: precio de cada caja en euros (p. ej. `39.9`).
- `months`: meses en los que se recomienda (1 = enero … 12 = diciembre). `[]` = todo el curso.
- `badge`: etiqueta opcional ("Más vendida", "Novedad"…).
- `contents`: lista de lo que incluye la caja (aparece en la ficha).

En `L12M_CONFIG` (mismo archivo) se cambian:

- **email**, **whatsapp**, **phoneLabel**, **instagram** → ⚠️ ahora son valores de ejemplo, hay que poner los reales.
- `bulkDiscount`: descuento por volumen (por defecto 10 % desde 5 cajas).
- `freeShippingFrom`: importe para envío gratis (0 para ocultarlo).

## Imágenes

- `assets/img/productos/<id>.webp` → foto de cada caja (el nombre coincide con el `id` del producto).
- `assets/img/logo.webp`, `logo-mark.webp`, `favicon.png` → logotipo con fondo transparente.

Para añadir una caja nueva: sube la imagen como `assets/img/productos/mi-caja.webp` y añade un objeto con `id: "mi-caja"` en `js/products.js`.

## Cómo llegan los pedidos

No hay pago online: el carrito ("Mi pedido") genera un mensaje con las cajas, cantidades, total y datos de la escuela, y lo abre en **WhatsApp** o en el **email** configurado. El formulario de caja personalizada funciona igual por email.

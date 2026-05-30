export async function GET() {
  const swaggerSpec = require('@/config/swagger');

  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Bíblia API — Swagger</title>
        <style>
          body { margin: 0; }
        </style>
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js" crossorigin></script>
        <script>
          window.SwaggerUIBundle({
            spec: ${JSON.stringify(swaggerSpec)},
            dom_id: '#swagger-ui',
            presets: [
              window.SwaggerUIBundle.presets.apis,
              window.SwaggerUIBundle.SwaggerUIStandalonePreset,
            ],
            layout: 'StandaloneLayout',
          });
        </script>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

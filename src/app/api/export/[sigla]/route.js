const versiculosController = require('@/controllers/versiculosController');

export async function GET(request, { params }) {
  const resolvedParams = await params;
  return versiculosController.exportarLivro(request, { params: resolvedParams });
}

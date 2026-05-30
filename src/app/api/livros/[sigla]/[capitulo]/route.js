const capitulosController = require('@/controllers/capitulosController');

export async function GET(request, { params }) {
  const resolvedParams = await params;
  return capitulosController.buscarCapitulo(request, { params: resolvedParams });
}

const versiculosController = require('@/controllers/versiculosController');

export async function GET(request) {
  return versiculosController.buscar(request);
}

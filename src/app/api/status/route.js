const versiculosController = require('@/controllers/versiculosController');

export async function GET() {
  return versiculosController.stats();
}

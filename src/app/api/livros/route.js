const livrosController = require('@/controllers/livrosController');

export async function GET() {
  return livrosController.listarTodos();
}

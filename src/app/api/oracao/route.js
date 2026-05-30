const oracaoController = require('@/controllers/oracaoController');

export async function GET() {
  return oracaoController.listarTodos();
}

export async function POST(request) {
  return oracaoController.criar(request);
}

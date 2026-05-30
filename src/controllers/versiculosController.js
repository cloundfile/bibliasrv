const versiculosService = require('@/services/versiculosService');
const { success, error } = require('@/utils/apiResponse');

const versiculosController = {
  async buscarReferencia(request, { params }) {
    try {
      const { sigla, capitulo, versiculo } = params;
      const numCapitulo = parseInt(capitulo, 10);
      const numVersiculo = parseInt(versiculo, 10);

      if (isNaN(numCapitulo) || isNaN(numVersiculo) || numCapitulo < 1 || numVersiculo < 1) {
        return Response.json(error('Capítulo e versículo devem ser números válidos', 400), { status: 400 });
      }

      const data = await versiculosService.buscarReferencia(sigla, numCapitulo, numVersiculo);
      return Response.json(success(data));
    } catch (err) {
      const status = err.statusCode || 500;
      return Response.json(error(err.message, status), { status });
    }
  },

  async versiculoDoDia() {
    try {
      const data = await versiculosService.versiculoDoDia();
      return Response.json(success(data));
    } catch (err) {
      const status = err.statusCode || 500;
      return Response.json(error(err.message, status), { status });
    }
  },

  async buscar(request) {
    try {
      const { searchParams } = new URL(request.url);
      const q = searchParams.get('q');

      if (!q || q.trim() === '') {
        return Response.json(error('O termo de busca ?q= é obrigatório', 400), { status: 400 });
      }

      const resultados = await versiculosService.buscar(q);
      return Response.json(success(resultados));
    } catch (err) {
      const status = err.statusCode || 500;
      return Response.json(error(err.message, status), { status });
    }
  },

  async stats() {
    try {
      const data = await versiculosService.stats();
      return Response.json(success(data));
    } catch (err) {
      const status = err.statusCode || 500;
      return Response.json(error(err.message, status), { status });
    }
  },

  async exportarLivro(request, { params }) {
    try {
      const { sigla } = params;
      const { searchParams } = new URL(request.url);
      const format = searchParams.get('format') === 'csv' ? 'csv' : 'json';

      const data = await versiculosService.exportarLivro(sigla);

      if (format === 'csv') {
        let csvContent = '\uFEFF';
        csvContent += 'Livro,Capítulo,Versículo,Texto\n';

        for (const cap of data.conteudo) {
          for (const v of cap.versiculos) {
            const textoEscapado = v.texto.replace(/"/g, '""');
            csvContent += `"${data.livro}",${cap.capitulo},${v.numero},"${textoEscapado}"\n`;
          }
        }

        return new Response(csvContent, {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename=biblia_${data.sigla}.csv`,
          },
        });
      }

      return new Response(JSON.stringify(data, null, 2), {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Disposition': `attachment; filename=biblia_${data.sigla}.json`,
        },
      });
    } catch (err) {
      const status = err.statusCode || 500;
      return Response.json(error(err.message, status), { status });
    }
  },
};

module.exports = versiculosController;

function AtaController() {
    var oTable;
    var id = "#table-clientes";

    this.view = function (id) {
        console.log('view');

        return this;
    };

    this.edit = function (id) {
        console.log('edit');

        return this;
    };

    this.remove = function (id) {
        QuestionVTT().run().no().yes(function (e) {
            MensagemVTT().show({'mensagem': 'registro excluído com sucesso!', 'tipo': 'success'}).close();
        });

        return this;
    };


    this.list = function () {
        oTable = DataTableVTT().run(id, {
            "processing": true,
            "serverSide": true,
            'ajax': {
                'url': ConfiguracoesVTT().baseUrl() + 'list',
                'type': 'POST'
            },
            'columnDefs': [
                {
                    'targets': [0],
                    'data': 'descricao',
                    'name': 'descricao'
                },
                {
                    'targets': [1],
                    'data': 'template',
                    'name': 'template',
                    'defaultContent': ''
                }
            ],
            "rowCallback": function (row, data) {
                $.get(ConfiguracoesVTT().baseUrl() + 'bundles/ataappata/js/templates-data-table/cadastro-ata/botoes-action.html', function (html) {
                    html = html.replace(/{{ID_ELEMENT}}/gi, data.DT_RowId);
                    $('td:eq(1)', row).html(html);
                });
            }
        });


        return this;
    };

    var regEvents = function () {
        return this;
    };


    this.save = function (e, form) {
        AjaxVTT().send({
            'vttUrl': ConfiguracoesVTT().pathRoot() + 'save',
            'vttData': form.serializeArray(),
            'vttDebug': true,
            'vttEvent': e
        }, function (html) {
            MensagemVTT().show(html).close();
        });

    };


    this.init = function () {
        list();
        regEvents();
    };

    return this;
}
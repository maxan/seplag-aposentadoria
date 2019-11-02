import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { BeneficioService } from '../shared/services/beneficio.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeItem } from '../shared/objects/tree-item';
import { Beneficio } from '../shared/objects/beneficio';
import { TramitacaoMovimento } from '../shared/objects/tramitacao-movimento';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IRespostaPadrao } from '../shared/objects/resposta-padrao';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { MensagemAlertaPagina } from '../shared/objects/mensagem-alerta-pagina';
import { ItemSeletor } from '../shared/objects/item-seletor';
import { TipoDocumentoBeneficio } from '../shared/objects/tipo-documento-beneficio';
import * as _ from 'lodash';

const TREE_DATA: TreeItem[] = [
    {
        name: 'Identificação',
        children: [
            { id: 101, name: 'Doc 235' },
            { id: 102, name: 'Doc 5356' },
            { id: 103, name: 'Doc 236643' }
        ]
    },
    {
        name: 'Vida Funcional',
        children: [
            { id: 1011, name: 'Doc 1394' },
            {
                id: 1221,
                name: 'Doc 9387439'
            }
        ]
    },
    {
        name: 'Contagem de Tempo',
        children: [
            {
                id: 7921,
                name: 'Doc 439587'
            },
            {
                id: 92921,
                name: 'Doc 9485736'
            }
        ]
    },
    {
        name: 'Remuneração/Proventos',
        children: [
            {
                id: 7921,
                name: 'Doc 439587'
            },
            {
                id: 92921,
                name: 'Doc 9485736'
            }
        ]
    }
];

const TIPO_DOCUMENTO: ItemSeletor[] = [
    {
        id: TipoDocumentoBeneficio.IDENTIFICACAO,
        descricao: 'Identificação'
    },
    {
        id: TipoDocumentoBeneficio.VIDA_FUNCIONAL,
        descricao: 'Vida Funcional'
    },
    {
        id: TipoDocumentoBeneficio.CONTAGEM_TEMPO,
        descricao: 'Contagem de Tempo'
    },
    {
        id: TipoDocumentoBeneficio.REMUNERACAO_PROVENTOS,
        descricao: 'Remuneração/Proventos'
    }
];

@Component({
    selector: 'app-edicao-beneficio-aposentadoria',
    templateUrl: './edicao-beneficio-aposentadoria.component.html',
    styleUrls: ['./edicao-beneficio-aposentadoria.component.scss']
})
export class EdicaoBeneficioAposentadoriaComponent implements OnInit {
    beneficio: Beneficio;
    tramitesMovimentos: TramitacaoMovimento[];
    tiposDocumento: ItemSeletor[];
    tipoDocumentoSelecionado: ItemSeletor;
    treeControl = new NestedTreeControl<TreeItem>(node => node.children);
    dataSource = new MatTreeNestedDataSource<TreeItem>();
    mensagemAlertaPagina: MensagemAlertaPagina;
    mensagemAlertaJanelaEnvioArquivo: MensagemAlertaPagina;
    uploader: FileUploader;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private beneficioService: BeneficioService,
        private modalService: NgbModal
    ) {
        this.dataSource.data = TREE_DATA;
        this.tiposDocumento = TIPO_DOCUMENTO;
    }

    ngOnInit() {
        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    return this.beneficioService.obterInformacoesBeneficioPorMatriculaServidor(
                        params.get('matricula')
                    );
                }),
                switchMap(resposta => {
                    if (resposta.sucesso) {
                        const beneficioEncontrado: Beneficio = resposta.retorno as Beneficio;
                        return this.beneficioService
                            .obterTramitacoesPorBeneficio(beneficioEncontrado.id)
                            .pipe(
                                map(respostaTramites => {
                                    if (respostaTramites && respostaTramites.sucesso) {
                                        return [
                                            beneficioEncontrado,
                                            respostaTramites.retorno as TramitacaoMovimento[]
                                        ] as [Beneficio, TramitacaoMovimento[]];
                                    }
                                    return ([beneficioEncontrado, [] as TramitacaoMovimento[]] as [
                                        Beneficio,
                                        TramitacaoMovimento
                                    ]) as [Beneficio, TramitacaoMovimento[]];
                                })
                            );
                    }
                    throw new Error(
                        'Ocorreu algum problema no carregamento das informações do benefício.'
                    );
                })
            )
            .subscribe(value => {
                this.beneficio = value[0];
                this.tramitesMovimentos = value[1];
                this.uploader = new FileUploader({
                    allowedMimeType: ['application/pdf', 'application/wps-office.pdf'],
                    maxFileSize: 10485760
                });
                this.uploader.onAfterAddingFile = file => {
                    file.withCredentials = false;
                    this.apagarMensagemAlertaJanelaEnvioArquivo();
                };
                this.uploader.onWhenAddingFileFailed = (
                    item: FileLikeObject,
                    filter: any,
                    options: any
                ) => {
                    switch (filter.name) {
                        case 'fileSize':
                            this.mensagemAlertaJanelaEnvioArquivo = {
                                tipo: 'warning',
                                mensagem: `O arquivo "${item.name}" é muito grande. O tamanho máximo é de 10MB.`
                            } as MensagemAlertaPagina;
                            break;
                        case 'mimeType':
                            this.mensagemAlertaJanelaEnvioArquivo = {
                                tipo: 'warning',
                                mensagem: `O arquivo "${item.name}" não é suportado. Apenas arquivos PDF.`
                            } as MensagemAlertaPagina;
                            break;
                        default:
                            this.mensagemAlertaJanelaEnvioArquivo = {
                                tipo: 'warning',
                                mensagem: `Um erro inesperado aconteceu: "${filter.name}".`
                            } as MensagemAlertaPagina;
                    }
                };
                this.uploader.response.subscribe(respostaEnvio => {
                    const resposta = JSON.parse(respostaEnvio) as IRespostaPadrao;
                    if (resposta.sucesso) {
                        this.mensagemAlertaPagina = {
                            tipo: 'success',
                            mensagem: 'Arquivo enviado com sucesso.'
                        } as MensagemAlertaPagina;
                    } else {
                        this.mensagemAlertaPagina = {
                            tipo: 'warning',
                            mensagem: 'Nenhum arquivo enviado.'
                        } as MensagemAlertaPagina;
                    }
                });
            });
    }

    hasChild = (_: number, node: TreeItem) => !!node.children && node.children.length > 0;

    carregarDocumento(node) {
        // TODO: Implementar visualização do arquivo após ser selecionado.
        console.log('SELECIONOU DOCUMENTO');
        console.log(node);
    }

    apagarMensagemAlertaPagina() {
        this.mensagemAlertaPagina = null;
    }

    apagarMensagemAlertaJanelaEnvioArquivo() {
        this.mensagemAlertaJanelaEnvioArquivo = null;
    }

    abrirJanelaEnvioArquivo(content) {
        this.tipoDocumentoSelecionado = this.tiposDocumento[0];
        this.apagarMensagemAlertaJanelaEnvioArquivo();
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
            result => {
                // TODO: Implementar tratamento para encerramento de modal.
            },
            reason => {
                // TODO: Implementar tratamento para encerramento de modal.
            }
        );
    }

    enviarArquivoSelecionado(modal) {
        if (!this.tipoDocumentoSelecionado) {
            this.mensagemAlertaJanelaEnvioArquivo = {
                tipo: 'warning',
                mensagem: 'É necessário selecionar o tipo do documento.'
            } as MensagemAlertaPagina;

            return;
        }
        let novaConfiguracao = _.clone(this.uploader.options);
        novaConfiguracao.url = `${environment.webApiHost}/v1/beneficios/${this.beneficio.id}/documentos/${this.tipoDocumentoSelecionado.id}`;
        this.uploader.setOptions(novaConfiguracao);
        this.uploader.uploadAll();
        modal.close(true);
    }
}

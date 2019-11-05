import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';
import { BeneficioService } from '../shared/services/beneficio.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ItemTreeDocumentoBeneficio } from '../shared/objects/item-tree-documento-beneficio';
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
import { DocumentoBeneficioService } from '../shared/services/documento-beneficio.service';
import { DocumentoBeneficio } from '../shared/objects/documento-beneficio';
import { SetorTramitacao } from '../shared/objects/setor-tramitacao';

const TREE_DATA_DOCUMENTOS: ItemTreeDocumentoBeneficio[] = [
    {
        key: 'IDENTIFICACAO',
        name: 'Identificação'
    },
    {
        key: 'VIDA_FUNCIONAL',
        name: 'Vida Funcional'
    },
    {
        key: 'CONTAGEM_TEMPO',
        name: 'Contagem de Tempo'
    },
    {
        key: 'REMUNERACAO_PROVENTOS',
        name: 'Remuneração/Proventos'
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

const SETOR_TRAMITACAO: ItemSeletor[] = [
    { id: SetorTramitacao.COMITE_GESTOR, descricao: 'Comitê Destor' },
    { id: SetorTramitacao.SECRETARIA, descricao: 'Secretaria' },
    { id: SetorTramitacao.ANALISE, descricao: 'Análise' }
];

@Component({
    selector: 'app-edicao-beneficio-aposentadoria',
    templateUrl: './edicao-beneficio-aposentadoria.component.html',
    styleUrls: ['./edicao-beneficio-aposentadoria.component.scss']
})
export class EdicaoBeneficioAposentadoriaComponent implements OnInit {
    @ViewChild('pdfViewer', { static: false }) pdfViewer;

    beneficio: Beneficio;
    tramitesMovimentos: TramitacaoMovimento[];
    tiposDocumento: ItemSeletor[];
    setoresTramitacao: ItemSeletor[];
    tipoDocumentoSelecionado: ItemSeletor;
    setorDestinoSelecionado: ItemSeletor;
    treeControl = new NestedTreeControl<ItemTreeDocumentoBeneficio>(node => node.children);
    dataSource = new MatTreeNestedDataSource<ItemTreeDocumentoBeneficio>();
    mensagemAlertaPagina: MensagemAlertaPagina;
    mensagemAlertaJanelaEnvioArquivo: MensagemAlertaPagina;
    mensagemAlertaJanelaTramitacao: MensagemAlertaPagina;
    uploader: FileUploader;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private beneficioService: BeneficioService,
        private documentoBeneficioService: DocumentoBeneficioService,
        private modalService: NgbModal
    ) {
        this.dataSource.data = TREE_DATA_DOCUMENTOS;
        this.tiposDocumento = TIPO_DOCUMENTO;
        this.setoresTramitacao = SETOR_TRAMITACAO;
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
                        return zip(
                            this.beneficioService.obterTramitacoesPorBeneficio(
                                beneficioEncontrado.id
                            ),
                            this.documentoBeneficioService.obterDocumentosPorBeneficio(
                                beneficioEncontrado.id
                            )
                        ).pipe(
                            map(([respostaTramites, respostaDocumentos]) => {
                                let tramites: TramitacaoMovimento[] = [];
                                let documentos: DocumentoBeneficio[] = [];
                                if (respostaTramites && respostaTramites.sucesso) {
                                    tramites = respostaTramites.retorno as TramitacaoMovimento[];
                                }
                                if (respostaDocumentos && respostaDocumentos.sucesso) {
                                    documentos = respostaDocumentos.retorno as DocumentoBeneficio[];
                                }
                                return [beneficioEncontrado, tramites, documentos] as [
                                    Beneficio,
                                    TramitacaoMovimento[],
                                    DocumentoBeneficio[]
                                ];
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
                if (value[2]) {
                    this.construirArvoreDocumentos(value[2]);
                }
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
                        this.atualizarListaDocumentos();
                    } else {
                        this.mensagemAlertaPagina = {
                            tipo: 'warning',
                            mensagem: 'Nenhum arquivo enviado.'
                        } as MensagemAlertaPagina;
                    }
                });
            });
    }

    hasChild = (_: number, node: ItemTreeDocumentoBeneficio) =>
        !!node.children && node.children.length > 0;

    carregarDocumento(node: ItemTreeDocumentoBeneficio) {
        if (node && node.id) {
            this.documentoBeneficioService.obterDocumento(node.id).subscribe(response => {
                this.pdfViewer.pdfSrc = response;
                this.pdfViewer.refresh();
            });
        }
    }

    private construirArvoreDocumentos(listaDocumento) {
        const mapaValores = _.groupBy(listaDocumento, 'tipoDocumentoBeneficio');
        const novaArvoreDocumentos = _.clone(this.dataSource.data);
        _.each(novaArvoreDocumentos, item => {
            item.children = _.map(mapaValores[item.key], child => {
                return {
                    ...child,
                    name: `[${child.id}] ${child.nomeOriginalArquivo}`
                } as ItemTreeDocumentoBeneficio;
            });
        });
        this.dataSource.data = null;
        this.dataSource.data = novaArvoreDocumentos;
    }

    private atualizarListaDocumentos() {
        this.documentoBeneficioService
            .obterDocumentosPorBeneficio(this.beneficio.id)
            .subscribe(resposta => {
                if (resposta && resposta.sucesso) {
                    this.construirArvoreDocumentos(resposta.retorno);
                }
            });
    }

    apagarMensagemAlertaPagina() {
        this.mensagemAlertaPagina = null;
    }

    apagarMensagemAlertaJanelaEnvioArquivo() {
        this.mensagemAlertaJanelaEnvioArquivo = null;
    }

    apagarMensagemAlertaJanelaTramitacao() {
        this.mensagemAlertaJanelaTramitacao = null;
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

    abrirJanelaTramitacaoProcesso(content) {
        this.setorDestinoSelecionado = this.setoresTramitacao[0];
        this.apagarMensagemAlertaJanelaTramitacao();
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

    tramitarProcesso(modal) {
        if (!this.setorDestinoSelecionado) {
            this.mensagemAlertaJanelaTramitacao = {
                tipo: 'warning',
                mensagem: 'É necessário selecionar o setor de destino.'
            } as MensagemAlertaPagina;

            return;
        }
        this.beneficioService
            .tramitarProcessoBeneficio(this.beneficio.id, this.setorDestinoSelecionado.id)
            .subscribe(
                resposta => {
                    if (resposta.sucesso) {
                        this.mensagemAlertaPagina = {
                            tipo: 'success',
                            mensagem: 'Tramitação relizada com sucesso.'
                        } as MensagemAlertaPagina;
                        modal.close(true);
                        this.beneficioService
                            .obterTramitacoesPorBeneficio(this.beneficio.id)
                            .subscribe(respostaTramitacao => {
                                if (respostaTramitacao.sucesso) {
                                    this.tramitesMovimentos = respostaTramitacao.retorno;
                                }
                            });
                    }
                },
                resposta => {
                    this.mensagemAlertaJanelaTramitacao = {
                        tipo: 'warning',
                        mensagem: `Um problema ocorreu ao tentar realizar a tramitação do processo. ${resposta.error.mensagem}.`
                    } as MensagemAlertaPagina;
                }
            );
    }
}

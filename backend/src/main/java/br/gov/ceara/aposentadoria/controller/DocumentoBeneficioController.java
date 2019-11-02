package br.gov.ceara.aposentadoria.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.gov.ceara.aposentadoria.dominio.dto.MensagemRetornoServicoDto;
import br.gov.ceara.aposentadoria.service.DocumentoBeneficioService;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@CrossOrigin
@RequestMapping(path = "/api/v1/documentos-beneficio")
@RestController
public class DocumentoBeneficioController {
    private static final Logger LOGGER = LoggerFactory.getLogger(DocumentoBeneficioController.class);
    private final DocumentoBeneficioService documentoBeneficioService;

    @Autowired
    public DocumentoBeneficioController(DocumentoBeneficioService documentoBeneficioService) {
        this.documentoBeneficioService = documentoBeneficioService;
    }

    @GetMapping(path = "/{documentoId}")
    @ResponseBody
    public Mono<ResponseEntity> obterDocumentoBeneficio(@PathVariable("documentoId") Long documentoId) {
        return this.documentoBeneficioService.obterDocumentoBeneficio(documentoId).subscribeOn(Schedulers.elastic())
                .map(documento -> {
                    return documento.map(documentoInfo -> {
                        Resource resource = new ByteArrayResource(documentoInfo.getConteudo());
                        if (resource.exists() && resource.isReadable()) {
                            return ResponseEntity.ok()
                                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"documento_ID_"
                                            + documentoInfo.getNomeOriginalArquivo() + "\"")
                                    .body(resource);
                        }

                        throw new RuntimeException(
                                String.format("Não foi possível ler o documento de benefício com ID %s.", documentoId));
                    }).orElseThrow(() -> new RuntimeException(String.format(
                            "Nenhum arquivo encontrado para o documento de benefício com ID %s.", documentoId)));
                });
    }

    @GetMapping(path = "/{beneficioId}/beneficio")
    public Mono<ResponseEntity> obterTramitacoesPorBeneficio(@PathVariable("beneficioId") Long beneficioId) {
        return this.documentoBeneficioService.listarDocumentosPorBeneficio(beneficioId)
                .subscribeOn(Schedulers.elastic()).collectList()
                .map(documentos -> new ResponseEntity(
                        new MensagemRetornoServicoDto.Builder(true, "Dcoumentos de benefício listadas com sucesso.")
                                .retorno(documentos).build(),
                        documentos.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK))
                .onErrorResume(throwable -> Mono.just(new ResponseEntity(
                        new MensagemRetornoServicoDto.Builder(false, throwable.getLocalizedMessage()).build(),
                        HttpStatus.BAD_REQUEST)));
    }
}

package br.gov.ceara.aposentadoria.controller;

import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import br.gov.ceara.aposentadoria.dominio.dto.MensagemRetornoServicoDto;
import br.gov.ceara.aposentadoria.enumerador.SetorTramitacao;
import br.gov.ceara.aposentadoria.enumerador.TipoBeneficio;
import br.gov.ceara.aposentadoria.enumerador.TipoDocumentoBeneficio;
import br.gov.ceara.aposentadoria.service.BeneficioService;
import br.gov.ceara.aposentadoria.service.DocumentoBeneficioService;
import br.gov.ceara.aposentadoria.service.TramitacaoMovimentoService;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@CrossOrigin
@RequestMapping(path = "/api/v1/beneficios")
@RestController
public class BeneficioController {
    private static final Logger LOGGER = LoggerFactory.getLogger(BeneficioController.class);
    private final BeneficioService beneficioService;
    private final TramitacaoMovimentoService tramitacaoMovimentoService;
    private final DocumentoBeneficioService documentoBeneficioService;

    @Autowired
    public BeneficioController(BeneficioService beneficioService,
            TramitacaoMovimentoService tramitacaoMovimentoService,
            DocumentoBeneficioService documentoBeneficioService) {
        this.beneficioService = beneficioService;
        this.tramitacaoMovimentoService = tramitacaoMovimentoService;
        this.documentoBeneficioService = documentoBeneficioService;
    }

    @GetMapping(path = "/servidores")
    public Mono<ResponseEntity> listarServidoresComBeneficio() {
        return this.beneficioService.listarServidoresComBeneficio().subscribeOn(Schedulers.elastic()).collectList()
                .map(servidores -> new ResponseEntity(
                        new MensagemRetornoServicoDto.Builder(true, "Servidores listados com sucesso.")
                                .retorno(servidores).build(),
                        servidores.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK))
                .onErrorResume(throwable -> Mono.just(new ResponseEntity(
                        new MensagemRetornoServicoDto.Builder(false, throwable.getLocalizedMessage()).build(),
                        HttpStatus.BAD_REQUEST)));
    }

    @GetMapping(path = "/servidores/{matricula}")
    public Mono<ResponseEntity> obterInformacoesBeneficioAposentadoriaPorMatriculaServidor(
            @PathVariable("matricula") String matricula) {
        return this.beneficioService.listarPorMatriculaServidor(matricula, TipoBeneficio.APOSENTADORIA)
                .subscribeOn(Schedulers.elastic()).map(beneficio -> {
                    return beneficio
                            .map(informacoesBeneficio -> new ResponseEntity(new MensagemRetornoServicoDto.Builder(true,
                                    "Informações de benefício encontradas com sucesso para o servidor informado.")
                                            .retorno(informacoesBeneficio).build(),
                                    HttpStatus.OK))
                            .orElse(new ResponseEntity(new MensagemRetornoServicoDto.Builder(true,
                                    "Nenhuma informação de benefício encontrada para o servidor informado.").build(),
                                    HttpStatus.NO_CONTENT));
                })
                .onErrorResume(throwable -> Mono.just(new ResponseEntity(
                        new MensagemRetornoServicoDto.Builder(false, throwable.getLocalizedMessage()).build(),
                        HttpStatus.BAD_REQUEST)));
    }

    @GetMapping(path = "/{beneficioId}/tramitacoes")
    public Mono<ResponseEntity> obterTramitacoesPorBeneficio(@PathVariable("beneficioId") Long beneficioId) {
        return this.tramitacaoMovimentoService.obterTramitacoesPorBeneficio(beneficioId)
                .subscribeOn(Schedulers.elastic()).collectList().defaultIfEmpty(Collections.emptyList())
                .map(tramitacoes -> new ResponseEntity(
                        new MensagemRetornoServicoDto.Builder(true, "Tramitações para benefício listadas com sucesso.")
                                .retorno(tramitacoes).build(),
                        tramitacoes.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK))
                .onErrorResume(throwable -> Mono.just(new ResponseEntity(
                        new MensagemRetornoServicoDto.Builder(false, throwable.getLocalizedMessage()).build(),
                        HttpStatus.BAD_REQUEST)));
    }

    @PostMapping(path = "/{beneficioId}/documentos/{tipoDocumento}")
    public Mono<ResponseEntity> salvarDocumentoBeneficio(@PathVariable("beneficioId") Long beneficioId,
            @PathVariable("tipoDocumento") TipoDocumentoBeneficio tipoDocumento,
            @RequestParam("file") MultipartFile arquivo) {
        return this.documentoBeneficioService.salvarDocumentoBeneficio(arquivo, beneficioId, tipoDocumento)
                .subscribeOn(Schedulers.elastic())
                .map(documentoSalvo -> new ResponseEntity(
                        new MensagemRetornoServicoDto.Builder(true, "Novo arquivo criado com sucesso.")
                                .retorno(documentoSalvo).build(),
                        HttpStatus.CREATED))
                .onErrorResume(throwable -> Mono.just(new ResponseEntity(
                        new MensagemRetornoServicoDto.Builder(false, throwable.getLocalizedMessage()).build(),
                        HttpStatus.BAD_REQUEST)));
    }

    @PutMapping(path = "/{beneficioId}/tramitacao/{setorDestino}")
    public Mono<ResponseEntity> tramitarProcessoBeneficio(@PathVariable("beneficioId") Long beneficioId,
            @PathVariable("setorDestino") SetorTramitacao setorDestino) {
        return this.tramitacaoMovimentoService.tramitarProcessoBeneficio(beneficioId, setorDestino)
                .subscribeOn(Schedulers.elastic())
                .map(tramitacoes -> new ResponseEntity(new MensagemRetornoServicoDto.Builder(true,
                        String.format("Processo movido para setor '%s'.", setorDestino)).retorno(tramitacoes).build(),
                        HttpStatus.CREATED))
                .onErrorResume(throwable -> Mono.just(new ResponseEntity(
                        new MensagemRetornoServicoDto.Builder(false, throwable.getLocalizedMessage()).build(),
                        HttpStatus.BAD_REQUEST)));
    }
}

package br.gov.ceara.aposentadoria.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.gov.ceara.aposentadoria.dominio.dto.MensagemRetornoServicoDto;
import br.gov.ceara.aposentadoria.service.ServidorService;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@CrossOrigin
@RequestMapping(path = "/api/v1/servidores")
@RestController
public class ServidorController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ServidorController.class);
    private final ServidorService servidorService;

    @Autowired
    public ServidorController(ServidorService servidorService) {
        this.servidorService = servidorService;
    }

    @GetMapping
    public Mono<ResponseEntity> listarServidores() {
        return this.servidorService.listarTodos().subscribeOn(Schedulers.elastic()).collectList()
                .map(servidores -> new ResponseEntity(
                        new MensagemRetornoServicoDto.Builder(true, "Servidores listados com sucesso.")
                                .retorno(servidores).build(),
                        servidores.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK))
                .onErrorResume(throwable -> Mono.just(new ResponseEntity(
                        new MensagemRetornoServicoDto.Builder(false, throwable.getLocalizedMessage()).build(),
                        HttpStatus.BAD_REQUEST)));
    }
}

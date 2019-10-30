package br.gov.ceara.aposentadoria.service;

import br.gov.ceara.aposentadoria.dominio.Servidor;
import br.gov.ceara.aposentadoria.repositorio.ServidorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServidorService  {
    @Autowired
    private ServidorRepository servidorRepository;

    public List<Servidor> listarTodos() {
        return servidorRepository.findAll();
    }
}

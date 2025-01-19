package com.ubiqube.mano.ui.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.ubiqube.mano.ui.entities.def.SchemaRoot;
import com.ubiqube.mano.ui.repositories.SchemaRootRepository;

@Service
public class FormService {
    private final SchemaRootRepository schemaRootRepository;
    public FormService(SchemaRootRepository schemaRootRepository) {
        this.schemaRootRepository = schemaRootRepository;
    }
    public SchemaRoot save(SchemaRoot formData) {
        return schemaRootRepository.save(formData);
    }
    public Page<SchemaRoot> findAll(PageRequest of) {
        return schemaRootRepository.findAll(of);
    }
}

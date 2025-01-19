package com.ubiqube.mano.ui.controller;

import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ubiqube.mano.ui.entities.def.SchemaRoot;
import com.ubiqube.mano.ui.service.FormService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/form")
@Validated
public class FormController {

    private final FormService formService;

    public FormController(final FormService formService) {
        this.formService = formService;
    }

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<SchemaRoot> submitForm(@Valid @RequestBody final SchemaRoot formData) {
        Objects.requireNonNull(formData.getName(), "Form name must be provided");
        SchemaRoot res = formService.save(formData);
        return ResponseEntity.ok(res);
    }

    @GetMapping(value = "/", produces = "application/json")
    public ResponseEntity<PagedModel<EntityModel<SchemaRoot>>> listForms(
            @RequestParam(defaultValue = "0") final int page, @RequestParam(defaultValue = "10") final int size,
            final PagedResourcesAssembler<SchemaRoot> assembler) {
        Page<SchemaRoot> result = formService.findAll(PageRequest.of(page, size));
        return ResponseEntity.ok(assembler.toModel(result));
    }
}

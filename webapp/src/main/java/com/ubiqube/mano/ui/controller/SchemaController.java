package com.ubiqube.mano.ui.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import com.ubiqube.mano.ui.entities.PropertyBlock;
import com.ubiqube.mano.ui.entities.def.SchemaRoot;
import com.ubiqube.mano.ui.service.SchemaConverter;

@RestController
@RequestMapping("/api/schema")
public class SchemaController {
    private final SchemaConverter schemaConverter;

    public SchemaController(SchemaConverter schemaConverter) {
        this.schemaConverter = schemaConverter;
    }

    @GetMapping(value = "/schema.json", produces = "application/json")
    public ResponseEntity<String> getSchema() {
        try {
            ClassPathResource resource = new ClassPathResource("schema.json");
            Path path = resource.getFile().toPath();
            String content = Files.readString(path);
            return new ResponseEntity<>(content, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/convert", consumes = "application/x-yaml", produces = "application/json")
    public ResponseEntity<PropertyBlock> convertToJsonSchema(@RequestBody String root) {
        SchemaRoot schemaRoot;
        try {
            schemaRoot = new ObjectMapper(new YAMLFactory()).readValue(root, SchemaRoot.class);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        PropertyBlock ret = schemaConverter.convertToPropertyBlock(schemaRoot);

        return new ResponseEntity<>(ret, HttpStatus.OK);
    }
}

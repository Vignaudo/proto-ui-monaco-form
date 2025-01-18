package com.ubiqube.mano.ui.entities.def;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "roots")
public class SchemaRoot {

	@Id
	private String id;
	private String name;
	private List<Field> fields;
}

package com.ubiqube.mano.ui.entities.def;

import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "fields")
public class Field {

	@Id
	private String id;
	private String name;
	private String label;
	@Nullable
	private String helpText;
	private String type = "string";
	@Nullable
	private List<String> choices;
	private String format;
	private String description;
	@Nullable
	private String defaultValue;
	private boolean required;
	private boolean secret;
	private boolean multiline;

}

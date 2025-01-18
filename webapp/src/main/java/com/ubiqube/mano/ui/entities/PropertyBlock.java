package com.ubiqube.mano.ui.entities;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonInclude(Include.NON_NULL)
@JsonPropertyOrder(value = { "type", "if", "then", "else" })
@NoArgsConstructor
public class PropertyBlock {
    @JsonProperty("$defs")
	private Map<String, PropertyBlock> defs;
	@JsonProperty("$ref")
	private String ref;
	@JsonProperty("$comment")
	private String comment;

	private String type;
	private String description;
	private Map<String, PropertyBlock> properties;
	private PropertyBlock items;
	private List<String> required;
	@JsonProperty("if")
	private PropertyBlock ifSmt;
	private PropertyBlock then;
	@JsonProperty("else")
	private PropertyBlock elseSmt;
	private Boolean additionalProperties;
	private Map<String, PropertyBlock> patternProperties;
	@JsonProperty("const")
	private String cnst;
	private List<PropertyBlock> allOf;
	private List<PropertyBlock> oneOf;
	@JsonIgnore
	private boolean mandatory;
	private String format;
	private Integer minLength;
	private Integer maxLength;
	private String pattern;
	private Integer minimum;
	private Integer maximum;
	private Boolean exclusiveMaximum;
	@JsonProperty("enum")
	private List<String> enumStmt;

	public static PropertyBlock ofType(final String type) {
		final PropertyBlock pb = new PropertyBlock();
		pb.setType(type);
		return pb;
	}

}

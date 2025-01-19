package com.ubiqube.mano.ui.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "formTypes")
public class FormType {

    @Id
    private String id;
    private String name;
    private String data;
}

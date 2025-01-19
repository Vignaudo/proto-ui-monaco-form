package com.ubiqube.mano.ui.service;

import org.springframework.stereotype.Service;

import com.ubiqube.mano.ui.entities.PropertyBlock;
import com.ubiqube.mano.ui.entities.def.Field;
import com.ubiqube.mano.ui.entities.def.SchemaRoot;

@Service
public class SchemaConverter {

    public PropertyBlock convertToPropertyBlock(final SchemaRoot schemaRoot) {
//        PropertyBlock ret = PropertyBlock.ofType("object");
//        Map<String, PropertyBlock> props = schemaRoot.getFields().stream()
//            .map(x -> convert(x))
//            .collect(Collectors.toMap(
//            x -> x.getComment(),
//            x -> x,
//            (e1, e2) -> e1,
//            LinkedHashMap::new
//            ));
//        ret.setProperties(props);
//        List<String> mandatory = props.entrySet().stream().filter(x -> x.getValue().isMandatory()).map(x -> x.getKey()).toList();
//        ret.setRequired(mandatory);
        return null;
    }

    private PropertyBlock convert(final Field field) {
        PropertyBlock propertyBlock = new PropertyBlock();
        propertyBlock.setType(field.getType());
        propertyBlock.setComment(field.getName());
        propertyBlock.setDescription(field.getDescription());
        if (field.getChoices() != null) {
            propertyBlock.setEnumStmt(field.getChoices());
        }
        propertyBlock.setMandatory(field.isRequired());
        return propertyBlock;
    }
}

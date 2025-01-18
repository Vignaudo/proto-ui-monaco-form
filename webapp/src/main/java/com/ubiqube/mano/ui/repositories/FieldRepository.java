package com.ubiqube.mano.ui.repositories;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.ubiqube.mano.ui.entities.def.Field;

public interface FieldRepository extends MongoRepository<Field, String> {
	// Custom query methods can be defined here if needed
}

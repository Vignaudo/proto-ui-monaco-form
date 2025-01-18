package com.ubiqube.mano.ui.repositories;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.ubiqube.mano.ui.entities.def.SchemaRoot;

public interface SchemaRootRepository extends MongoRepository<SchemaRoot, String> {
	// Custom query methods can be defined here if needed
}


package com.ubiqube.mano.ui.repositories;

import com.ubiqube.mano.ui.entities.FormType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormTypeRepository extends MongoRepository<FormType, String> {
    // Custom query methods can be defined here if needed
}

package com.example.application.endpoints;

import com.example.application.data.Person;
import com.example.application.service.PersonRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class PersonEndpoint {

    private final PersonRepository personRepository;

    public PersonEndpoint(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<Person> findAll() {
        return personRepository.findAll();
    }

}

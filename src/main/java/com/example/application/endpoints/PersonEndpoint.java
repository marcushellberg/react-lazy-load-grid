package com.example.application.endpoints;

import com.example.application.data.Person;
import com.example.application.service.PersonRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import org.springframework.data.domain.PageRequest;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class PersonEndpoint {

    private final PersonRepository personRepository;

    public record PageResponse(
            List<Person> items,
            long totalCount
    ) {
    }


    public PersonEndpoint(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<Person> findAll() {
        return personRepository.findAll();
    }

    public PageResponse getPeople(int page, int pageSize) {
        var res = personRepository.findAll(PageRequest.of(page, pageSize));

        return new PageResponse(res.getContent(), res.getTotalElements());
    }
}

package com.exProg.transactWeb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

public class DatabaseLoader implements CommandLineRunner{

    private final UserRepository repository;

    @Autowired
    public DatabaseLoader(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        this.repository.save(new User("Frodo", "Baggins", "ring bearer"));
        Iterable<User> user = this.repository.findAll();
    }
}

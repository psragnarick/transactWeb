package com.exProg.transactWeb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

public class DatabaseLoader implements CommandLineRunner{

    private final UserRepository repository;

    @Autowired // <3>
    public DatabaseLoader(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception { // <4>
        this.repository.save(new User("Frodo", "Baggins", "ring bearer"));
    }
}

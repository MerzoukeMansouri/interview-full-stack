package com.interview.full.stack.todo.list.api.common;

import org.junit.jupiter.api.BeforeAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.utility.DockerImageName;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public abstract class ControllerTest {
    @LocalServerPort
    private int port;

    protected String url() {
        return "http://localhost:" + port + "/tasks";
    }

    private static final MongoDBContainer mongoDbContainer =
            new MongoDBContainer(DockerImageName.parse("mongo:latest"));

    @Autowired
    protected TestRestTemplate restTemplate;

    @BeforeAll
    static void setup() {
        mongoDbContainer.start();
    }

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.data.mongodb.uri", mongoDbContainer::getReplicaSetUrl);
    }
}

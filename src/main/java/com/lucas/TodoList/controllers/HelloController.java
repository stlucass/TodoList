package com.lucas.TodoList.controllers;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api")

public class HelloController {
    @GetMapping("/hello")
    public String Hello() {
        return "Olá Mundo!";
    }
    
}

package com.todo;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/todos")
public class TodoController {
    private final TodoService todoService;
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<TodoDto> getTodos(@RequestParam String filter) {
        return todoService.getTodos(filter)
                .stream()
                .map(todo -> new TodoDto(todo.getId(), todo.getTask(), todo.getPriority()))
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTodo(@PathVariable int id) {
        todoService.deleteTodo(id);
    }
}

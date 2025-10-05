package com.todo;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class TodoService {
    private final TodoRepository todoRepository;
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }
    public List<Todo> getTodos(String filter) {
        if (StringUtils.isEmpty(filter)) {
            return todoRepository.findAll();
        }
        return todoRepository.findByTaskContainingIgnoreCase(filter);
    }
    public void deleteTodo(int id) {
        todoRepository.deleteById(id);
    }
}

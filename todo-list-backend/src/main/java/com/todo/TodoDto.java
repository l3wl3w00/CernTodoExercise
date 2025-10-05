package com.todo;

public class TodoDto {
    public TodoDto(int id, String task, int priority) {
        this.id = id;
        this.task = task;
        this.priority = priority;
    }

    private int id;
    private String task;
    private int priority;

    public int getId() {
        return id;
    }
    public String getTask() {
        return task;
    }
    public int getPriority() {
        return priority;
    }
}

package com.todo;

import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class Todo {
    @Id
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

package com.persistencia.apiweb.service;

public class LoginMesage {
    Boolean status;
    long id;
    String name;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public LoginMesage() {
    }

    public LoginMesage( Boolean status, long id, String name) {
        this.status = status;
        this.id = id;
        this.name = name;
    }
}
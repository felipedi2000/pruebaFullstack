package com.persistencia.apiweb.dto;

public class TicketNewDto {
    private String title;
    private String description;
    private String coment;
    private long createdBy;
    private long historyUser;
    private int status;

    public TicketNewDto() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getComent() {
        return coment;
    }

    public void setComent(String coment) {
        this.coment = coment;
    }

    public long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(long createdBy) {
        this.createdBy = createdBy;
    }

    public long getHistoryUser() {
        return historyUser;
    }

    public void setHistoryUser(long historyUser) {
        this.historyUser = historyUser;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}

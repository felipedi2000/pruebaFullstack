package com.persistencia.apiweb.dto;

public class HistoryUserDto {

    private long id;
    private String titleHistory;
    private String descriptionHistory;

    public HistoryUserDto() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitleHistory() {
        return titleHistory;
    }

    public void setTitleHistory(String titleHistory) {
        this.titleHistory = titleHistory;
    }

    public String getDescriptionHistory() {
        return descriptionHistory;
    }

    public void setDescriptionHistory(String descriptionHistory) {
        this.descriptionHistory = descriptionHistory;
    }
}

package com.persistencia.apiweb.dto;

public class HistoryUserTicketDTO {

    //private long id;
    private String titleHistory;
    private String descriptionHistory;
    private long historyCreatedBy;
    private long idProject;

    private String titleTicket;

    private String descriptionTicket;


    private String ticketComent;

    public HistoryUserTicketDTO() {
    }

    public String getTicketComent() {
        return ticketComent;
    }

    public void setTicketComent(String ticketComent) {
        this.ticketComent = ticketComent;
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

    public long getHistoryCreatedBy() {
        return historyCreatedBy;
    }

    public void setHistoryCreatedBy(long historyCreatedBy) {
        this.historyCreatedBy = historyCreatedBy;
    }

    public long getIdProject() {
        return idProject;
    }

    public void setIdProject(long idProject) {
        this.idProject = idProject;
    }

    public String getTitleTicket() {
        return titleTicket;
    }

    public void setTitleTicket(String titleTicket) {
        this.titleTicket = titleTicket;
    }

    public String getDescriptionTicket() {
        return descriptionTicket;
    }

    public void setDescriptionTicket(String descriptionTicket) {
        this.descriptionTicket = descriptionTicket;
    }

}

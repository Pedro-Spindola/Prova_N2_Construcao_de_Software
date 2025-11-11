package com.lp7.atividade07.exception;

import java.time.LocalDateTime;

public class ErroResponse {
    private int status;
    private String messagem;
    private LocalDateTime time;

    public ErroResponse(int status, String messagem, LocalDateTime time) {
        this.status = status;
        this.messagem = messagem;
        this.time = time;
    }
    
    public int getStatus() {
        return status;
    }
    public void setStatus(int status) {
        this.status = status;
    }
    public String getMessagem() {
        return messagem;
    }
    public void setMessagem(String messagem) {
        this.messagem = messagem;
    }
    public LocalDateTime getTime() {
        return time;
    }
    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}

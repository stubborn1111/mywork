package com.hengzhi.entity;

public class BoardHost {
    private Integer boardHostId;

    private Integer userId;

    private Integer board_id;

    public BoardHost() {
    }

    public BoardHost(Integer boardHostId, Integer userId, Integer board_id) {
        this.boardHostId = boardHostId;
        this.userId = userId;
        this.board_id = board_id;
    }

    public Integer getBoardHostId() {
        return boardHostId;
    }

    public void setBoardHostId(Integer boardHostId) {
        this.boardHostId = boardHostId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getBoard_id() {
        return board_id;
    }

    public void setBoard_id(Integer board_id) {
        this.board_id = board_id;
    }

    @Override
    public String toString() {
        return "BoardHost{" +
                "boardHostId=" + boardHostId +
                ", userId=" + userId +
                ", board_id=" + board_id +
                '}';
    }
}

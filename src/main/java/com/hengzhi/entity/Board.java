package com.hengzhi.entity;
/**
   *板块类
 **/
public class Board {
//    板块id
    private Integer boardId;

//    板块名字
    private String boardName;

//    板块帖子数目
    private Integer postNumber;

    public Board() {
    }

    public Board(Integer boardId, String boardName, Integer postNumber) {
        this.boardId = boardId;
        this.boardName = boardName;
        this.postNumber = postNumber;
    }

    public Integer getBoardId() {
        return boardId;
    }

    public void setBoardId(Integer boardId) {
        this.boardId = boardId;
    }

    public String getBoardName() {
        return boardName;
    }

    public void setBoardName(String boardName) {
        this.boardName = boardName;
    }

    public Integer getPostNumber() {
        return postNumber;
    }

    public void setPostNumber(Integer postNumber) {
        this.postNumber = postNumber;
    }

    @Override
    public String toString() {
        return "Board{" +
                "boardId=" + boardId +
                ", boardName='" + boardName + '\'' +
                ", postNumber=" + postNumber +
                '}';
    }
}


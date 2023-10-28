package com.hengzhi.entity;

public class Praise {
    private Integer praiseId;

    private Integer userId;

    private Integer postId;

    private Integer replyId;

    private Integer kind;

    public Praise() {
    }

    public Praise(Integer praiseId, Integer userId, Integer postId, Integer replyId, Integer kind) {
        this.praiseId = praiseId;
        this.userId = userId;
        this.postId = postId;
        this.replyId = replyId;
        this.kind = kind;
    }

    public Integer getPraiseId() {
        return praiseId;
    }

    public void setPraiseId(Integer praiseId) {
        this.praiseId = praiseId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public Integer getReplyId() {
        return replyId;
    }

    public void setReplyId(Integer replyId) {
        this.replyId = replyId;
    }

    public Integer getKind() {
        return kind;
    }

    public void setKind(Integer kind) {
        this.kind = kind;
    }

    @Override
    public String toString() {
        return "Praise{" +
                "praiseId=" + praiseId +
                ", userId=" + userId +
                ", postId=" + postId +
                ", replyId=" + replyId +
                ", kind='" + kind + '\'' +
                '}';
    }
}

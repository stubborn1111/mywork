package com.hengzhi.entity;
/**
 *回复类
 **/
public class Reply {
    private Integer replyId;

    //哪个帖子的
    private Integer postId;

    //回复人
    private Integer userId;

    //被回复的帖子的id
    private Integer repliedId;

    //回复的内容
    private String replyInfo;

    //回复类型，对回复或者对帖子
    private Integer kind;

    //点赞
    private Integer praise;

    //日期
    private String date;

    public Reply() {
    }

    public Reply(Integer replyId, Integer postId, Integer userId, Integer repliedId, String replyInfo, Integer kind, Integer praise, String date) {
        this.replyId = replyId;
        this.postId = postId;
        this.userId = userId;
        this.repliedId = repliedId;
        this.replyInfo = replyInfo;
        this.kind = kind;
        this.praise = praise;
        this.date = date;
    }

    public Integer getReplyId() {
        return replyId;
    }

    public void setReplyId(Integer replyId) {
        this.replyId = replyId;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getRepliedId() {
        return repliedId;
    }

    public void setRepliedId(Integer repliedId) {
        this.repliedId = repliedId;
    }

    public String getReplyInfo() {
        return replyInfo;
    }

    public void setReplyInfo(String replyInfo) {
        this.replyInfo = replyInfo;
    }

    public Integer getKind() {
        return kind;
    }

    public void setKind(Integer kind) {
        this.kind = kind;
    }

    public Integer getPraise() {
        return praise;
    }

    public void setPraise(Integer praise) {
        this.praise = praise;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Reply{" +
                "replyId=" + replyId +
                ", postId=" + postId +
                ", userId=" + userId +
                ", repliedId=" + repliedId +
                ", replyInfo=" + replyInfo +
                ", kind=" + kind +
                ", praise=" + praise +
                ", date='" + date + '\'' +
                '}';
    }
}

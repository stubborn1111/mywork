package com.hengzhi.entity;

public class Notice {
    private Integer noticeId;

    private Integer userId;

    private Integer postId;

    private Integer someone;

    private String noticeType;

    private String whetherSee;

    public Notice() {
    }

    public Notice(Integer userId, Integer postId, Integer someone, String noticeType) {
        this.userId = userId;
        this.postId = postId;
        this.someone = someone;
        this.noticeType = noticeType;
    }

    public Notice(Integer noticeId, Integer userId, Integer postId, Integer someone, String noticeType, String whetherSee) {
        this.noticeId = noticeId;
        this.userId = userId;
        this.postId = postId;
        this.someone = someone;
        this.noticeType = noticeType;
        this.whetherSee = whetherSee;
    }

    public Integer getNoticeId() {
        return noticeId;
    }

    public void setNoticeId(Integer noticeId) {
        this.noticeId = noticeId;
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

    public Integer getSomeone() {
        return someone;
    }

    public void setSomeone(Integer someone) {
        this.someone = someone;
    }

    public String getNoticeType() {
        return noticeType;
    }

    public void setNoticeType(String noticeType) {
        this.noticeType = noticeType;
    }

    public String getWhetherSee() {
        return whetherSee;
    }

    public void setWhetherSee(String whetherSee) {
        this.whetherSee = whetherSee;
    }

    @Override
    public String toString() {
        return "Notice{" +
                "noticeId=" + noticeId +
                ", userId=" + userId +
                ", postId=" + postId +
                ", someone=" + someone +
                ", noticeType='" + noticeType + '\'' +
                ", whetherSee='" + whetherSee + '\'' +
                '}';
    }
}

package com.hengzhi.entity;

/**
 * 帖子类
 **/
public class Post {
    private Integer postId;

    //    标题
    private String title;

    //    内容
    private String info;

    //    帖主
    private Integer userId;

    //    收到回复数
    private Integer replyNumber;

    //点赞
    private String praise;

    //是否审核通过
    private Integer review;

    //是否置顶
    private String whetherTop;

    //是否包含文件
    private String whetherFile;

    //文件地址
    private String fileUrl;

    //属于哪个板块
    private Integer whichBoard;

    //是否被审核过了
    private String whetherReview;
    //时间
    private String date;

    public Post() {
    }

    public Post(String title, String info, Integer userId, String whetherFile, String fileUrl, Integer whichBoard) {
        this.title = title;
        this.info = info;
        this.userId = userId;
        this.whetherFile = whetherFile;
        this.fileUrl = fileUrl;
        this.whichBoard = whichBoard;
    }

    public Post(String title, String info, Integer userId, Integer whichBoard,String whetherFile) {
        this.title = title;
        this.info = info;
        this.userId = userId;
        this.whichBoard = whichBoard;
        this.whetherFile = whetherFile;
    }

    public Post(Integer postId, String title, String info, Integer userId, Integer replyNumber, String praise, Integer review, String whetherTop, String whetherFile, String fileUrl, Integer whichBoard, String whetherReview, String date) {
        this.postId = postId;
        this.title = title;
        this.info = info;
        this.userId = userId;
        this.replyNumber = replyNumber;
        this.praise = praise;
        this.review = review;
        this.whetherTop = whetherTop;
        this.whetherFile = whetherFile;
        this.fileUrl = fileUrl;
        this.whichBoard = whichBoard;
        this.whetherReview = whetherReview;
        this.date = date;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getReplyNumber() {
        return replyNumber;
    }

    public void setReplyNumber(Integer replyNumber) {
        this.replyNumber = replyNumber;
    }

    public String getPraise() {
        return praise;
    }

    public void setPraise(String praise) {
        this.praise = praise;
    }

    public Integer getReview() {
        return review;
    }

    public void setReview(Integer review) {
        this.review = review;
    }

    public String getWhetherTop() {
        return whetherTop;
    }

    public void setWhetherTop(String whetherTop) {
        this.whetherTop = whetherTop;
    }

    public String getWhetherFile() {
        return whetherFile;
    }

    public void setWhetherFile(String whetherFile) {
        this.whetherFile = whetherFile;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public Integer getWhichBoard() {
        return whichBoard;
    }

    public void setWhichBoard(Integer whichBoard) {
        this.whichBoard = whichBoard;
    }

    public String getWhetherReview() {
        return whetherReview;
    }

    public void setWhetherReview(String whetherReview) {
        this.whetherReview = whetherReview;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Post{" +
                "postId=" + postId +
                ", title='" + title + '\'' +
                ", info='" + info + '\'' +
                ", userId=" + userId +
                ", replyNumber=" + replyNumber +
                ", praise='" + praise + '\'' +
                ", review='" + review + '\'' +
                ", whetherTop='" + whetherTop + '\'' +
                ", whetherFile='" + whetherFile + '\'' +
                ", fileUrl='" + fileUrl + '\'' +
                ", whichBoard=" + whichBoard +
                ", whetherReview='" + whetherReview + '\'' +
                ", date='" + date + '\'' +
                '}';
    }
}

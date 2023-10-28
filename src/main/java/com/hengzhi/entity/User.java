package com.hengzhi.entity;
/**
 *用户类
 **/
public class User {
//     用户id
    private Integer userId;

//     用户名
    private String username;

//     用户密码
    private String password;

//     用户积分
    private Integer score;

//    用户等级
    private Integer level;

//    头像地址
    private String headImageUrl;

//    身份，管理员、或用户,admin
    private String power;

    //是否通过审核，管理注册的审核问题
    private int review;

    //是否已经审核过了
    private String whetherReview;


    public User() {
    }

    public User(Integer userId) {
        this.userId = userId;
    }

    public User(String username) {
        this.username = username;
    }

    public User(Integer userId, String username, String password, Integer score, Integer level, String headImageUrl, String power, int review, String whetherReview) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.score = score;
        this.level = level;
        this.headImageUrl = headImageUrl;
        this.power = power;
        this.review = review;
        this.whetherReview = whetherReview;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getHeadImageUrl() {
        return headImageUrl;
    }

    public void setHeadImageUrl(String headImageUrl) {
        this.headImageUrl = headImageUrl;
    }

    public String getPower() {
        return power;
    }

    public void setPower(String power) {
        this.power = power;
    }

    public int getReview() {
        return review;
    }

    public void setReview(int review) {
        this.review = review;
    }

    public String getWhetherReview() {
        return whetherReview;
    }

    public void setWhetherReview(String whetherReview) {
        this.whetherReview = whetherReview;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", score=" + score +
                ", level=" + level +
                ", headImageUrl='" + headImageUrl + '\'' +
                ", power='" + power + '\'' +
                ", review=" + review +
                ", whetherReview='" + whetherReview + '\'' +
                '}';
    }
}

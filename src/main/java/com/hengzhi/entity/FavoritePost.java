package com.hengzhi.entity;

/**
 * 个人收藏的帖子
 */
public class FavoritePost {
    private Integer favoritepostId;

    //    被收藏帖子
    private String CollectedId;

    //    收藏的人
    private String CollectorId;

    public FavoritePost() {
    }

    public FavoritePost(Integer favoritepostId, String collectedId, String collectorId) {
        this.favoritepostId = favoritepostId;
        CollectedId = collectedId;
        CollectorId = collectorId;
    }

    public Integer getFavoritepostId() {
        return favoritepostId;
    }

    public void setFavoritepostId(Integer favoritepostId) {
        this.favoritepostId = favoritepostId;
    }

    public String getCollectedId() {
        return CollectedId;
    }

    public void setCollectedId(String collectedId) {
        CollectedId = collectedId;
    }

    public String getCollectorId() {
        return CollectorId;
    }

    public void setCollectorId(String collectorId) {
        CollectorId = collectorId;
    }

    @Override
    public String toString() {
        return "FavoritePost{" +
                "favoritepostId=" + favoritepostId +
                ", CollectedId='" + CollectedId + '\'' +
                ", CollectorId='" + CollectorId + '\'' +
                '}';
    }
}

package com.hengzhi.entity;

public class FavoritePeople {
    private Integer favoritePeopleId;

    //    被收藏的人
    private String CollectedId;

    //    收藏的人
    private String CollectorId;

    //是否是好友
    private String bothStatus;

    public FavoritePeople() {
    }

    public FavoritePeople(Integer favoritePeopleId, String collectedId, String collectorId, String bothStatus) {
        this.favoritePeopleId = favoritePeopleId;
        CollectedId = collectedId;
        CollectorId = collectorId;
        this.bothStatus = bothStatus;
    }

    public Integer getFavoritePeopleId() {
        return favoritePeopleId;
    }

    public void setFavoritePeopleId(Integer favoritePeopleId) {
        this.favoritePeopleId = favoritePeopleId;
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

    public String getBothStatus() {
        return bothStatus;
    }

    public void setBothStatus(String bothStatus) {
        this.bothStatus = bothStatus;
    }

    @Override
    public String toString() {
        return "FavoritePeople{" +
                "favoritePeopleId=" + favoritePeopleId +
                ", CollectedId='" + CollectedId + '\'' +
                ", CollectorId='" + CollectorId + '\'' +
                ", bothStatus='" + bothStatus + '\'' +
                '}';
    }
}

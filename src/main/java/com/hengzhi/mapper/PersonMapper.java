package com.hengzhi.mapper;


import com.hengzhi.entity.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * 用户个人页面Mapper接口
 */
@Repository
public interface PersonMapper {
    //个人信息的修改，头像和密码
    public void userUpdate(User user);

    //主页所有的板块
    public List<Board> allBoard();

    //个人信息
    public User information(@Param("userId")Integer userId);

    //个人页面的关注,返回用户关注的人
    public List<Integer> focus(@Param("userId") Integer userId);

    //关注用户
    public void focusPerson(@Param("userId")Integer userId,@Param("userId1")Integer userId1,@Param("bothStatus")String bothStatus);

    //判断是否对方已经关注了自己
    public FavoritePeople ifFocus(@Param("userId")Integer userId,@Param("userId1")Integer userId1);

    //个人页面取消关注
    public void cancelFocus(@Param("userId")Integer userId,@Param("userId1")Integer userId1);

    //个人页面粉丝
    public List<Integer> fans(@Param("userId") Integer userId);

    //个人页面的帖子
    public List<Post> allPost(@Param("userId") Integer userId);

    //个人页面的帖子
    public List<Post> allPost1(@Param("userId") Integer userId);


    //个人收藏的帖子
    public List<Integer> collect(@Param("userId") Integer userId);

    //个人页面取消收藏
    public void cancelCollect(@Param("userId") Integer userId, @Param("postId") Integer postId);

    //根据Collected_id或Collector_id获取User类型的用户
    public User getUserByCollectId(Integer userId);

    //根据Collected_id或Collector_id获取User类型的用户
    public User getUserByCollectId1(Integer userId);

    //根据Collected_id或Collector_id获取Post类型的帖子
    public Post getPostByCollectId(Integer postId);

    //增加帖子
    public void addPost(Post post);

    //判断两个用户是否互关
    public FavoritePeople bothStatus(@Param("userId")Integer userId,@Param("userId1")Integer userId1);

    //个人页面好友
    public List<Integer> friend(@Param("userId") Integer userId);

    //根据用户id，获取用户名
    public String getUsernameByUserId(Integer userId);

    //根据板块id，返回所管理的板块名字
    public String getBoardNameByBoardId(Integer boardId);

    //增加通知
    public void addNotice(Notice notice);

    //返回刚发的帖子id
    public List<Integer> getPostId(Integer userId);

    //增加积分
    public void addScore(@Param("userId")Integer userId,@Param("score")Integer score);

    //得到积分
    public Integer getScore(Integer userId);

    //升级
    public void addLevel(Integer userId);

}

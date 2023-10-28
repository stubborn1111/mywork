package com.hengzhi.mapper;

import com.hengzhi.entity.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Indexed;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 *帖子Mapper接口，回复、点赞等等
 */

@Repository
public interface PostMapper {
    //根据用户id，帖子id，判断用户收藏此帖子
    public Integer ifCollect(@Param("userId")Integer userId,@Param("postId")Integer postId);

    //根据用户id，帖子id，判断用户是否给此帖子点赞
    public Integer ifPraise(@Param("userId")Integer userId,@Param("postId")Integer postId);

    //根据用户id，回复id，判断用户是否给此回复点赞
    public Integer ifPraise1(@Param("userId")Integer userId,@Param("replyId")Integer replyId);

    //根据帖子id获取帖子
    public Post getPostByPostId(Integer postId);

    // 根据板块id，返回板块名字
    public String getBoardNameByBoardId(Integer boardId);

    //根据用户id获取用户信息
    public User getUserByUserId(Integer userId);

    //给帖子id，按时间返回，所有回复
    public List<Reply> getReplyByPostId(Integer postId);

    //判断一个回复是否存在
    public Reply replyExist(Integer replyId);

    //返回帖子id
    public List<Integer> getReplyId(@Param("userId")Integer userId,@Param("postId")Integer postId);

    //回复功能
    public void addReply(Reply reply);

    //给帖子点赞
    public void addPostPraise(Praise praise);

    //给回复点赞
    public void addReplyPraise(Praise praise);

    //取消点赞
    public void cancelPraise(Praise praise);

    //收藏帖子
    public void addCollect(@Param("userId")Integer userId,@Param("postId")Integer postId);

    //取消收藏
    public void cancelCollect(@Param("userId")Integer userId,@Param("postId")Integer postId);

    //删除评论
    public void deleteReply(@Param("replyId")Integer replyId);

    //增加通知
    public void addNotice(Notice notice);

    public Integer getUserIdByReplyId(Integer replyId);

    public Integer getUserIdByPostId(Integer replyId);

    //增加积分
    public void addScore(@Param("userId")Integer userId,@Param("score")Integer score);

    //得到积分
    public Integer getScore(Integer userId);

    //升级
    public void addLevel(Integer userId);

    //给点赞+1
    public void addPraise(@Param("postId")Integer postId,@Param("score")Integer score);

    //给回复点赞+1
    public void addPraise1(@Param("replyId")Integer replyId,@Param("score")Integer score);
}

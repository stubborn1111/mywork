package com.hengzhi.mapper;

import com.hengzhi.controller.CreatCenterController;
import com.hengzhi.entity.Post;
import com.hengzhi.entity.Reply;
import lombok.Data;

import java.util.List;

public interface CreatCenterMapper {
    //返回所有帖子
    public List<Post> allPost(Integer userId);

    //返回帖子对应的板块名
    public String getBoardNameByBoardId(Integer boardId);

    //获取用户帖子的所有id
    public List<Integer> getAllPostId(Integer userId);

    //返回用户帖子被收藏的数目
    public Integer postCollectNumber(Integer postId);

    //返回用户被点赞的数量，帖子被点赞post.praise,
    public Integer postPraise(Integer postId);

    //获取用户回复的所有id
    public List<Integer> getAllReplyId(Integer userId);

    //或回复被点赞,reply.praise,
    public Integer replyPraise(Integer replyId);

    //返回用户帖子被回复的数量，
    public Integer postReplyNumber(Integer postId);

    //或回复被回复的数量
    public Integer replyReplyNumber(Integer replyId);

    //    创作发布帖子
    public void addPost(Post post);

    public List<Reply> allReply(Integer userId);

    public String getPostByPostId(Integer postId);

}

package com.hengzhi.mapper;

import com.hengzhi.entity.Notice;
import com.hengzhi.entity.Post;
import com.hengzhi.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 *消息通知Mapper接口，
 */
@Repository
public interface NoticeMapper {
    //关注新消息数
    public Integer focusNum(Integer userId);

    //点赞新消息数
    public Integer praiseNum(Integer userId);

    //评论新消息数
    public Integer replyNum(Integer userId);

    //被点赞的帖子和点赞的用户
    public List<Notice> praiseResult(Integer userId);

    public User getUserByUserId(Integer userId);

    public Post getPostByPostId(Integer postId);

    public List<Notice> replyResult(Integer userId);

    public List<Integer> focusResult(Integer userId);

    public void clean(@Param("userId")Integer userId,@Param("noticeType")String noticeType);

}

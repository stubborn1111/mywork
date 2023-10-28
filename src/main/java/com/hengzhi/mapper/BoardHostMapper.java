package com.hengzhi.mapper;

import com.hengzhi.entity.Post;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 版主Mapper接口，置顶，移动到其他板块等等
 */

@Repository
public interface BoardHostMapper {
    //版主置顶
    public void topPost(Integer postId);

    //版主置顶
    public void cancelTopPost(Integer postId);

    //版主删贴
    public void deletePost(Integer postId);

    //删除帖子的回复
    public void deletePostReply(Integer postId);

    //删除帖子的点赞
    public void deleteReplyPraise(Integer postId);

    //根据用户id，返回所管理的板块id
    public Integer getBoardIdByUserId(Integer userId);

    //根据板块id，返回所管理的板块名字
    public String getBoardNameByBoardId(Integer boardId);

    //版主可以管理的所有帖子
    public List<Post> allPost(Integer boardId);

    //根据用户id，获取用户名
    public String getUsernameByUserId(Integer userId);

    //版主移动帖子到其他板块
    public void movePost(@Param("postId") Integer postId, @Param("whichBoard") Integer whichBoard);
}

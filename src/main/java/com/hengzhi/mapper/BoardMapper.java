package com.hengzhi.mapper;

import com.hengzhi.entity.Board;
import com.hengzhi.entity.Post;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 进入某个具体板块的相关接口Mapper类
 */
@Repository
public interface BoardMapper {

    public String getBoardName(Integer boardId);
    //所有的板块
    public List<Board> allBoard();

    //板块的热帖
    public List<Post> hotPost(Integer whichBoard);

    //对应板块的所有未置顶帖子
    public List<Post> allPostByBoardId(@Param("boardId")Integer boardId);

    //对应板块的置顶帖子
    public Post allPost1ByBoardId(@Param("boardId")Integer boardId);

    //根据板块id，返回所管理的板块名字
    public String getBoardNameByBoardId(Integer boardId);

    //根据用户id，获取用户名
    public String getUsernameByUserId(Integer userId);

}

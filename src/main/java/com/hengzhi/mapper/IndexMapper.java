package com.hengzhi.mapper;

import com.hengzhi.entity.Board;
import com.hengzhi.entity.Post;
import com.hengzhi.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 网站主页的Mapper接口
 */
@Repository
public interface IndexMapper {
    //搜索功能，搜索标题
    public List<Post> search(String query);

    //搜索功能，搜索帖主
    public List<User> searchByUser(String query);

    //搜索帖子标题和内容
    public List<Post> searchAll(String query);

    //主页所有的板块
    public List<Board> allBoard();

    //所有板块的帖子
    public List<Post> allPost();

    //根据板块id，返回所管理的板块名字
    public String getBoardNameByBoardId(Integer boardId);

    //根据用户id，获取用户名
    public String getUsernameByUserId(Integer userId);

    //前10个热帖
    public List<Post>  hotPost();

    //板块精华
    public Post hotBoardPost(@Param("whichBoard")Integer whichBoard);

    //板块数量
    public Integer boardNumber();

    //特定板块的帖子
    public List<Post> allPostByBoardId(Integer boardId);

    //根据用户id得到帖主
    public User getUserById(Integer userId);

    //推荐帖主
    public List<Post> hotPoster();
}

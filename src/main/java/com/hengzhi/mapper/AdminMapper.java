package com.hengzhi.mapper;

import com.hengzhi.entity.Board;
import com.hengzhi.entity.Post;
import com.hengzhi.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 论坛板块的Mapper接口
 */
@Repository
public interface AdminMapper {
    //返回所有用户
    public List<User> allUser();

    //根据用户id，返回所管理的板块id
    public Integer getBoardIdByUserId(Integer userId);

    //根据用户id，获取用户名
    public String getUsernameByUserId(Integer userId);

    //根据板块id，返回所管理的板块名字
    public String getBoardNameByBoardId(Integer boardId);

    //返回所有帖子
    public List<Post> allPost();

    //返回所有板块
    public List<Board> allBoard();

    //所有待审核帖子
    public List<Post> allReviewPost();

    //所有待审核管理
    public List<User> allReviewAdmin();

    //审核新管理员，通过或不通过，把whether_review改为YES
    public void adminReview(User user);

    //管理审核帖子
    public void postReview(Post post);

    /*
        删除帖子
     */
    //删除帖子
    public void deletePost(Integer postId);

    //删除帖子的回复
    public void deletePostReply(Integer postId);

    //删除对帖子的点赞
    public void deletePostReplyPraise(Integer postId);

    //删除对帖子的收藏
    public void deletePostFocus(Integer postId);

    /*
    删除用户
     */
    //删除用户
    public void deleteUser(Integer userId);

    //删除用户的帖子
    public void deleteUserPost(Integer userId);

    //获取用户所有的帖子的id
    public List<Integer> allUserPostId(Integer userId);

    //删除对帖子的收藏，同上

    //删除用户的帖子的回复，同上

    //删除帖子的点赞，包括对回复的，同上

    //删除用户的回复
    public void deleteUserReply(Integer userId);

    //谁关注了此用户，或者被关注，删除一下
    public void deleteFavoritePeople(Integer userId);

    /*
    删除板块
     */
    //删除板块,提前板块中是否有帖子
    public void deleteBoard(Integer boardId);

    //返回板块的帖子条数
    public Integer boardPostNumber(Integer boardId);

    //管理任命版主
    public void appointBoardHost(@Param("userId")Integer userId,@Param("boardId")Integer boardId);

    //管理取消版主身份
    public void deleteBoardHost(@Param("userId")Integer userId);

    //个人信息的修改，头像和密码
    public void userUpdate(User user);

    //管理搜索功能
    public List<Post> searchPost(@Param("query")String query,@Param("boardId")Integer boardId);

    //板块名查重
    public Board boardNameCheck(@Param("boardName") String boardName);

    //增加板块
    public void addBoard(String boardName);

    //更改板块帖子数目,好像有错
    public Board updatePostNumber(Board board);




}

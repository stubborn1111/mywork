package com.hengzhi.service;

import com.hengzhi.entity.Board;
import com.hengzhi.entity.Post;
import com.hengzhi.entity.User;
import com.hengzhi.mapper.AdminMapper;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("AdminService")
public class AdminService {
    @Autowired
    AdminMapper adminMapper;

    @Data
    public static class User1 {
        User user;
        String boardName;
    }

    //所有用户
    public List<User1> allUser() {
        List<User> list = adminMapper.allUser();
        List<User1> list1 = new ArrayList<User1>();
        for (int i = 0; i < list.size(); i++) {
            User1 user1 = new User1();
            user1.user = list.get(i);
            user1.boardName = adminMapper.getBoardNameByBoardId(adminMapper.getBoardIdByUserId(list.get(i).getUserId()));
            list1.add(user1);
        }
        return list1;
    }

    //所有板块
    public List<Board> allBoard() {
        return adminMapper.allBoard();
    }

    @Data
    public static class AdminAllPost {
        String username;
        String boardName;
        Post post;
    }

    //所有帖子
    public List<AdminAllPost> allPost() {
        List<Post> list = adminMapper.allPost();
        List<AdminAllPost> list1 = new ArrayList<AdminAllPost>();
        for (int i = 0; i < list.size(); i++) {
            AdminAllPost adminAllPost = new AdminAllPost();
            adminAllPost.post = list.get(i);
            adminAllPost.username = adminMapper.getUsernameByUserId(list.get(i).getUserId());
            adminAllPost.boardName = adminMapper.getBoardNameByBoardId(list.get(i).getWhichBoard());
            list1.add(adminAllPost);
        }
        return list1;
    }

    //所有待审核管理员
    public List<User> allReviewAdmin() {
        return adminMapper.allReviewAdmin();
    }


    //所有待审核帖子
    public List<AdminAllPost> allReviewPost() {
        List<AdminAllPost> result = new ArrayList<>();
        List<Post> list = adminMapper.allReviewPost();
        for (int i = 0; i < list.size(); i++) {
            AdminAllPost aap = new AdminAllPost();
            aap.post = list.get(i);
            aap.username = adminMapper.getUsernameByUserId(list.get(i).getUserId());
            aap.boardName = adminMapper.getBoardNameByBoardId(list.get(i).getWhichBoard());
            result.add(aap);
        }

        return result;
    }

    //管理审核新的管理员
    public void adminReview(Integer userId, Integer review) {
        User user = new User();
        user.setUserId(userId);
        user.setReview(review);
        adminMapper.adminReview(user);
    }

    //管理审核帖子
    public void postReview(Integer postId, Integer review) {
        Post post = new Post();
        post.setPostId(postId);
        post.setReview(review);
        adminMapper.postReview(post);
    }

    //管理删除帖子
    public void deletePost(Integer postId) {
        adminMapper.deletePost(postId);
        adminMapper.deletePostReply(postId);
        adminMapper.deletePostReplyPraise(postId);
        adminMapper.deletePostFocus(postId);
    }

    //管理删除用户
    public void deleteUser(Integer userId) {
        List<Integer> list = adminMapper.allUserPostId(userId);
        for (int i = 0; i < list.size(); i++) {
            int a = list.get(i);
            adminMapper.deletePostFocus(a);
            adminMapper.deletePostReply(a);
            adminMapper.deletePostReplyPraise(a);
        }
        adminMapper.deleteUser(userId);
        adminMapper.deleteFavoritePeople(userId);
        adminMapper.deleteUserPost(userId);
    }

    //管理删除板块
    public Integer deleteBoard(Integer boardId) {
        Integer flag = adminMapper.boardPostNumber(boardId);
        if (flag == null) {
            adminMapper.deleteBoard(boardId);
            return 1;
        } else return 0;
    }

    //管理任命版主
    public List<User1> appointBoardHost(Integer userId, Integer boardId) {
        adminMapper.appointBoardHost(userId, boardId);
        User user = new User();
        user.setUserId(userId);
        user.setPower("moderator");
        System.out.println("-------");
        adminMapper.userUpdate(user);
        System.out.println("=======");
        return allUser();
    }

    //管理取消任命版主
    public List<User1> cancelAppointBoardHost(Integer userId) {
        adminMapper.deleteBoardHost(userId);
        User user = new User();
        user.setUserId(userId);
        user.setPower("nomal");
        adminMapper.userUpdate(user);
        return allUser();
    }

    //管理搜索帖子功能
    public List<Post> searchPost(Integer boardId, String query) {
        return adminMapper.searchPost(query, boardId);
    }


    @Data
    public static class AddBoardResult {
        Integer flag;//是否增加成功，成功是1
        List<Board> list;//局部刷新，返回所有帖子
    }

    //增加板块功能
    public AddBoardResult addBoard(String boardName) {
        AddBoardResult addBoardResult = new AddBoardResult();
        if (adminMapper.boardNameCheck(boardName) == null) {
            addBoardResult.flag = 1;
            adminMapper.addBoard(boardName);
        } else addBoardResult.flag = 0;
        addBoardResult.list = allBoard();
        return addBoardResult;
    }

}

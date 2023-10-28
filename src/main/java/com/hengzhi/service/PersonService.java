package com.hengzhi.service;

import com.hengzhi.entity.*;
import com.hengzhi.mapper.PersonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("PersonService")
public class PersonService {
    @Autowired
    private PersonMapper personMapper;

    //个人信息
    public User information(Integer userId) {
        return personMapper.information(userId);
    }

    //获取所有板块
    public List<Board> allBoard() {
        System.out.println(personMapper.allBoard());
        return personMapper.allBoard();
    }

    //用户个人信息修改
    public void userUpdate(User user) {
        System.out.println("personMapper的userUpdate");
        System.out.println(user.getUserId());
        System.out.println(user.getHeadImageUrl());
        personMapper.userUpdate(user);
    }

    //用户关注的人
    public List<Integer> focus(Integer userId) {
        System.out.println(userId);
        return personMapper.focus(userId);
    }

    //用户的粉丝
    public List<Integer> fans(Integer userId) {
        return personMapper.fans(userId);
    }

    //个人页面好友
    public List<User> friend(Integer userId) {
        List<Integer> list = personMapper.friend(userId);
        List<User> list1 = new ArrayList<User>();
        for (int i = 0; i < list.size(); i++) {
            list1.add(personMapper.getUserByCollectId(list.get(i)));
        }
        return list1;
    }

    //个人页面的帖子
    public List<AdminService.AdminAllPost> allPost(Integer userId) {
        System.out.println(userId);
        List<Post> list = personMapper.allPost(userId);
        List<AdminService.AdminAllPost> list1 = new ArrayList<AdminService.AdminAllPost>();
        for (int i = 0; i < list.size(); i++) {
            AdminService.AdminAllPost adminAllPost = new AdminService.AdminAllPost();
            adminAllPost.post = list.get(i);
            adminAllPost.username = personMapper.getUsernameByUserId(list.get(i).getUserId());
            adminAllPost.boardName = personMapper.getBoardNameByBoardId(list.get(i).getWhichBoard());
            list1.add(adminAllPost);
        }
        return list1;
    }

    //个人页面的帖子
    public List<AdminService.AdminAllPost> allPost1(Integer userId) {
        System.out.println(userId);
        List<Post> list = personMapper.allPost1(userId);
        List<AdminService.AdminAllPost> list1 = new ArrayList<AdminService.AdminAllPost>();
        for (int i = 0; i < list.size(); i++) {
            AdminService.AdminAllPost adminAllPost = new AdminService.AdminAllPost();
            adminAllPost.post = list.get(i);
            adminAllPost.username = personMapper.getUsernameByUserId(list.get(i).getUserId());
            adminAllPost.boardName = personMapper.getBoardNameByBoardId(list.get(i).getWhichBoard());
            list1.add(adminAllPost);
        }
        return list1;
    }

    //个人页面的收藏的帖子
    public List<AdminService.AdminAllPost> collect(Integer userId) {
        //帖子id
        List<Integer> list = personMapper.collect(userId);
        List<Post> list1 = new ArrayList<Post>();
        int size = list.size();
        for (int i = 0; i < size; i++) {
            Integer a = list.get(i);
            Post post = personMapper.getPostByCollectId(a);
            //帖子
            list1.add(post);
        }
        List<AdminService.AdminAllPost> list2 = new ArrayList<AdminService.AdminAllPost>();
        for (int j = 0; j < list1.size(); j++) {
            AdminService.AdminAllPost adminAllPost = new AdminService.AdminAllPost();
            adminAllPost.post = list1.get(j);
            adminAllPost.username = personMapper.getUsernameByUserId(list1.get(j).getUserId());
            adminAllPost.boardName = personMapper.getBoardNameByBoardId(list1.get(j).getWhichBoard());
            list2.add(adminAllPost);
        }
        return list2;
    }

    //根据Collected_id或Collector_id获取User类型的用户
    public User getUserByCollectId(Integer userId) {
        return personMapper.getUserByCollectId1(userId);
    }

    //根据Collected_id或Collector_id获取Post类型的帖子
    public Post getPostByCollectId(Integer postId) {
        return personMapper.getPostByCollectId(postId);
    }

    //个人页面取消收藏
    public void cancelCollect(Integer userId, Integer postId) {
        System.out.println("userid和postid:" + userId + "----" + postId);
        personMapper.cancelCollect(userId, postId);
    }

    //关注用户,判断对方是否关注了你，
    public void focusPerson(Integer userId, Integer userId1) {
        Notice notice  = new Notice(userId,0,userId1,"focus");
        personMapper.addNotice(notice);
        FavoritePeople flag = personMapper.ifFocus(userId, userId1);
        if (flag == null) personMapper.focusPerson(userId, userId1, "NO");
        else personMapper.focusPerson(userId, userId1, "YES");
        //积分等级
        if((personMapper.getScore(userId)+10)%50<=9)personMapper.addLevel(userId);
        personMapper.addScore(userId,10);
    }


    //个人页面取消关注
    public void cancelFocus(Integer userId, Integer userId1) {
        personMapper.cancelFocus(userId, userId1);
    }

    //增加帖子
    public Integer addPost(Post post) {
        personMapper.addPost(post);
        List<Integer> list = personMapper.getPostId(post.getUserId());
        return list.get(list.size()-1);
    }

    //注销账户
    public void unsubscibe(Integer userId) {
        User user = new User();
        user.setUserId(userId);
        user.setReview(1);
        user.setUsername("此账户已注销");
        personMapper.userUpdate(user);
    }

    //    是否是本人以及是否关注过
    public int ifSelf(Integer userId, Integer userId1) {
        FavoritePeople flag = personMapper.ifFocus(userId,userId1);
        if (flag == null) return 0;
        else return 1;
    }


}

package com.hengzhi.service;


import com.hengzhi.entity.Post;
import com.hengzhi.entity.User;
import com.hengzhi.mapper.UserMapper;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("UserService")
public class UserService {
    @Autowired
    private UserMapper usermapper;

    //用户登录
    public User loginCheck(String username, String password){
        System.out.println("UserService的loginCheck");
        User user = new User();
        user.setLevel(100000);
        if(usermapper.loginAboutUser(username,password)!=null){
            return usermapper.loginAboutUser(username,password);
        }else return user;

//        System.out.println(user);

    }

    //注册查重
    public int usernameCheck(String username){
        System.out.println("UserService的registCheck");
        if(usermapper.usernameCheck(username)==null) {
            return 1;
        } else return 0;//注册的用户名存在
    }

    //用户注册
    public void userRegist(String username, String password){
        System.out.println("UserService的userRegist");
        usermapper.userRegist(username,password);
    }


    @Data
    public static class HotPostResult{
        String boardName;
        Post post;
    }
    //返回热帖
    public HotPostResult hotPost() {
        HotPostResult hotPostResult = new HotPostResult();
        hotPostResult.post = usermapper.hotPost();
        hotPostResult.boardName = usermapper.getBoardNameByBoardId(hotPostResult.post.getWhichBoard());
        return hotPostResult;
    }


}

package com.hengzhi.controller;

import com.hengzhi.entity.Post;
import com.hengzhi.entity.User;
import com.hengzhi.service.PersonService;
import com.hengzhi.service.UserService;
import com.hengzhi.utils.Md5Utils;
import jdk.nashorn.internal.objects.annotations.Getter;
import jdk.nashorn.internal.objects.annotations.Setter;
import lombok.Data;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.UUID;

/**
 * 登录和注册以及热帖的控制，5
 */
@Controller
@RequestMapping("/Usercontroller")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    PersonService personService;

    @Data
    private static class UserParamsMap {
        private String username;
        private String password;
//        private String resultCode;
    }

    @Data
    private static class UserParamsMap1 {
        private String username;
        private String password;
        private String msg;
//        private String resultCode;
    }

    //登录验证
    @RequestMapping("/login")
    @ResponseBody
    public HashMap<String, Integer> loginCheck(@RequestBody UserParamsMap data, HttpServletRequest request) throws IOException {
        //控制台打印信息
        System.out.println("登录controller");
        System.out.println("username:" + data.username);
        System.out.println("password:" + data.password);
        HttpSession session = request.getSession();
        HashMap<String, Integer> map = new HashMap<>();
        User user = new User();
        user = userService.loginCheck(data.username, data.password);//登录查询
        System.out.println("user.name:" + user.getUsername());
        System.out.println("********************");
        int flag = 0;//是否登录成功
        int msg = 0;//登录身
        //登录成功
        if (user.getUserId() != null) {
            //正在审核，不能登录
            if (user.getReview() == 1) {
                flag = 0;
                msg = 1;
            } else {
                flag = 1;
                if (user.getPower().equals("admin")) msg = 1;//管理身份
                else if (user.getPower().equals("moderator")) msg = 2;//版主身份
                else msg = 0;//普通用户身份
                session.setAttribute("user", user);
            }
        } else {
            flag = 0;
        }
        map.put("flag", flag);
        map.put("msg", msg);
        System.out.println("map:" + map);
        return map;
    }

    //注册验证
    @RequestMapping("/regist")
    @ResponseBody
    public HashMap<String, String> registCheck(@RequestBody UserParamsMap1 userParamsMap) {
        int flag1 = userService.usernameCheck(userParamsMap.username);//用户名查重
        if (flag1 == 1) {
            //Md5Utils md5Utils = new Md5Utils();
            //String password = md5Utils.md5(userParamsMap.password);
            //用户名不存在
            userService.userRegist(userParamsMap.username, userParamsMap.password);
            if (userParamsMap.msg.equals("1")) {
                User user = userService.loginCheck(userParamsMap.username, userParamsMap.password);
                user.setReview(1);
                user.setPower("admin");
                System.out.println(user);
                personService.userUpdate(user);
            }
            System.out.println("注册成功");
        } else if (flag1 == 0) {
            System.out.println("注册失败，用户名已存在");
        } else System.out.println("注册出现问题");
        HashMap<String, String> map = new HashMap<>();
        String flag = "1";
        if (flag1 == 1) flag = "1";
        else flag = "0";
        map.put("message", userParamsMap.msg);
        map.put("flag", flag);
        return map;
    }


    //热帖
    @RequestMapping("/hotPost")
    @ResponseBody
    public UserService.HotPostResult hotPost() {
        return userService.hotPost();
    }

    //登录信息的传值
    @RequestMapping("/userStatusCheck")
    @ResponseBody
    public User userStatusCheck(HttpServletRequest request) {
        HttpSession session = request.getSession();
        User user = new User();
        user = (User) session.getAttribute("user");
        System.out.println("登录信息的传值" + user);
        if (user != null) {
            return user;
        } else return new User(0);
    }

    //退出登录
    @RequestMapping("/logOut")
    @ResponseBody
    public int logOut(@RequestBody JSONObject jsonObject, HttpSession session) {
        System.out.println("/logOut");
//        Integer userId = (Integer) session.getAttribute("userId");
        session.invalidate();
        return 1;
    }


}

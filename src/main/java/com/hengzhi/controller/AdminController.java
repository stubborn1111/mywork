package com.hengzhi.controller;

import com.hengzhi.entity.Board;
import com.hengzhi.entity.Post;
import com.hengzhi.entity.User;
import com.hengzhi.service.AdminService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 管理的相关接口，14
 */
@Controller
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    AdminService adminService;

    //所有的用户信息
    @RequestMapping("/user")
    @ResponseBody
    public List<AdminService.User1> allUser(){
        return adminService.allUser();
    }

    //所有的板块
    @RequestMapping("/board")
    @ResponseBody
    public List<Board> allBoard(){
        return adminService.allBoard();
    }

    //所有的帖子
    @RequestMapping("/post")
    @ResponseBody
    public List<AdminService.AdminAllPost> allPost(){
        //System.out.println("所有的帖子");
        return adminService.allPost();
    }

    //待审核管理员
    @RequestMapping("/adiminReview")
    @ResponseBody
    public List<User> allReviewAdmin(){
        return adminService.allReviewAdmin();
    }

    //待审核帖子
    @RequestMapping("/postReview")
    @ResponseBody
    public List<AdminService.AdminAllPost> allReviewPost(){
        return adminService.allReviewPost();
    }

    //管理审核新的管理员
    @RequestMapping("/checkadmin")
    @ResponseBody
    public int adminReview(@RequestBody JSONObject jsonObject){
        Integer userId = jsonObject.getInt("userId");
        Integer review = jsonObject.getInt("review");
        adminService.adminReview(userId,review);
        return 1;
    }

    //管理审核帖子
    @RequestMapping("/checkPost")
    @ResponseBody
    public int postReview (@RequestBody JSONObject jsonObject){
        //System.out.println("管理审核帖子");
        Integer postId = jsonObject.getInt("postId");
        Integer review = jsonObject.getInt("review");
        //System.out.println(postId);
        //System.out.println(review);
        adminService.postReview(postId,review);
        return 1;
    }

    //管理删除帖子
    @RequestMapping("/deletePost")
    @ResponseBody
    public int deletePost(@RequestBody JSONObject jsonObject){
        //System.out.println("管理删除帖子");
        Integer postId = jsonObject.getInt("postId");
        //System.out.println(postId);
        adminService.deletePost(postId);
        return 1;
    }

    //管理删除用户
    @RequestMapping("/deleteuser")
    @ResponseBody
    public void deleteUser(@RequestBody JSONObject jsonObject){
        //System.out.println("管理删除用户");
        Integer userId = jsonObject.getInt("userId");
        adminService.deleteUser(userId);
    }

    //管理删除板块
    @RequestMapping("/deleteboard")
    @ResponseBody
    public Integer deleteBoard(@RequestBody JSONObject jsonObject) {
        //System.out.println("管理删除板块");
        Integer boardId = jsonObject.getInt("boardId");
        int flag = adminService.deleteBoard(boardId);//1是成功，0是失败
        return flag;
    }

    //管理任命版主
    @RequestMapping("/appointboardhost")
    @ResponseBody
    public int appointBoardHost(@RequestBody JSONObject jsonObject) {
        //System.out.println("管理任命版主");
        Integer userId = jsonObject.getInt("userId");
        Integer boardId = jsonObject.getInt("boardId");
        //System.out.println(userId);
        //System.out.println(boardId);
        adminService.appointBoardHost(userId,boardId);
        return 1;
        //List<AdminService.User1>
    }

    //管理取消任命版主
    @RequestMapping("/cancelBoardHost")
    @ResponseBody
    public int cancelAppointBoardHost(@RequestBody JSONObject jsonObject) {
        //System.out.println("管理取消任命版主");
        Integer userId = jsonObject.getInt("userId");
        //System.out.println(userId);
        adminService.cancelAppointBoardHost(userId);
        return  1;
    }

    //管理搜索帖子功能
    @RequestMapping("/search")
    @ResponseBody
    public List<Post> searchPost(@RequestBody JSONObject jsonObject) {
        Integer boardId = jsonObject.getInt("boardId");
        String query = jsonObject.getString("query");
        return adminService.searchPost(boardId,query);
    }

    //增加板块功能
    @RequestMapping("/addBoard")
    @ResponseBody
    public AdminService.AddBoardResult addBoard(@RequestBody JSONObject jsonObject) {
        String boardName = jsonObject.getString("boardName");
        return adminService.addBoard(boardName);
    }

}

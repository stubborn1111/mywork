package com.hengzhi.controller;


import com.fasterxml.jackson.databind.util.JSONPObject;
import com.hengzhi.entity.Board;
import com.hengzhi.entity.Post;
import com.hengzhi.entity.User;
import com.hengzhi.service.AdminService;
import com.hengzhi.service.IndexService;
import lombok.Data;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * 主页相关接口，7
 */
@Controller
@RequestMapping("/index")
public class IndexController {
    @Autowired
    IndexService indexService;

    //搜索功能
    @RequestMapping("/search")
    @ResponseBody
    public int search(@RequestBody JSONObject jsonObject, HttpServletRequest request) {
        //System.out.println("搜索接口");
        String query = jsonObject.getString("query");
        //System.out.println(query);
        HttpSession session = request.getSession();
        session.setAttribute("query", query);
        return 1;
    }


    //全站搜索结果，帖子
    @RequestMapping("/searchResult1")
    @ResponseBody
    public List<AdminService.AdminAllPost> searchAll(@RequestBody JSONObject jsonObject, HttpServletRequest request) {
        //System.out.println("searchresult1");
        HttpSession session = request.getSession();
        String query = (String) session.getAttribute("query");
        //System.out.println("query" + query + "-----");
        List<AdminService.AdminAllPost> list = indexService.searchAll(query);
        return list;
    }

    //全站搜素结果，用户
    @RequestMapping("/searchResult2")
    @ResponseBody
    public List<User> searchUser(@RequestBody JSONObject jsonObject, HttpServletRequest request) {
        //System.out.println("searchresult2");
        HttpSession session = request.getSession();
        String query = (String) session.getAttribute("query");
        //.out.println("query" + query + "-----" + query);
        List<User> list = indexService.searchByUser(query);
        //System.out.println(list);
        return list;
    }

    //全站搜索结果，帖子
    @RequestMapping("/searchResult3")
    @ResponseBody
    public List<AdminService.AdminAllPost> searchAll1(@RequestBody JSONObject jsonObject, HttpServletRequest request) {
        //System.out.println("searchresult3");
        String  query = jsonObject.getString("query");
        //System.out.println("query" + query + "-----");
        List<AdminService.AdminAllPost> list = indexService.searchAll(query);
        return list;
    }

    //全站搜素结果，用户
    @RequestMapping("/searchResult4")
    @ResponseBody
    public List<User> searchUser1(@RequestBody JSONObject jsonObject, HttpServletRequest request) {
        //System.out.println("searchresult4");
        String  query = jsonObject.getString("query");
        //System.out.println("query" + query + "-----" + query);
        List<User> list = indexService.searchByUser(query);
        //System.out.println(list);
        return list;
    }

    //主页所有板块名字
    @RequestMapping("/board")
    @ResponseBody
    public List<Board> allBoard() {
        return indexService.allBoard();
    }


    //主页所有板块热帖
    @RequestMapping("/hotPost")
    @ResponseBody
    public List<AdminService.AdminAllPost> hotPost() {
        return indexService.hotPost();
    }

    //主页板块精华
    @RequestMapping("/boardmain")
    @ResponseBody
    public List<AdminService.AdminAllPost> boardMain() {
        return indexService.hotBoardPost();
    }

    //主页推荐帖主
    @RequestMapping("/recommendposter")
    @ResponseBody
    public List<User> recommendPoster() {
        System.out.println("recommendposter");
        return indexService.hotPoster();
    }
}

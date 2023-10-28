package com.hengzhi.controller;

import com.hengzhi.entity.Post;
import com.hengzhi.entity.Reply;
import com.hengzhi.service.CreateCenterService;
import lombok.Data;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 用户个人中心的相关接口，3
 */
@Controller
@RequestMapping("/create")
public class CreatCenterController {
    @Autowired
    CreateCenterService createCenterService;

    //创作帖子管理,板块名和帖子
    @RequestMapping("/postManage")
    @ResponseBody
    public List<CreateCenterService.CreatCenterPost> postManage(@RequestBody JSONObject jsonObject){
        Integer userId = jsonObject.getInt("userId");
        return createCenterService.postManage(userId);
    }

    //    创作中心信息，给id，返回用户帖子被收藏数，点赞数，回复数
    @RequestMapping("/information")
    @ResponseBody
    public CreateCenterService.InformationResult CreateCenterInformation(@RequestBody JSONObject jsonObject) {
        Integer userId = jsonObject.getInt("userId");
        return createCenterService.CreateCenterInformation(userId);
    }

    //创作发布帖子
    @RequestMapping("/addPost")
    @ResponseBody
    public void addPost(@RequestBody JSONObject jsonObject) {
        Post post = (Post) jsonObject.get("post");
        createCenterService.addPost(post);
    }

    //所有写过的回复,
    @RequestMapping("/allReply")
    @ResponseBody
    public List<CreateCenterService.ReplyResult> allReply(@RequestBody JSONObject jsonObject){
        Integer userId = jsonObject.getInt("userId");
        return createCenterService.allReply(userId);
    }

}

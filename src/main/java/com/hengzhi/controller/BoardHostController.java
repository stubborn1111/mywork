package com.hengzhi.controller;

import com.hengzhi.service.BoardHostService;
import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 版主相关接口，4
 */
@Controller
@RequestMapping("/boardHost")
public class BoardHostController {
    @Autowired
    BoardHostService bhs;

    //版主置顶
    @RequestMapping("/topPost")
    @ResponseBody
    public int topPost(@RequestBody JSONObject jsonObject) {
        Integer postId = jsonObject.getInt("postId");
        bhs.topPost(postId);
        return 1;
    }

    //版主取消置顶
    @RequestMapping("/cancelTopPost")
    @ResponseBody
    public int cancelTopPost(@RequestBody JSONObject jsonObject) {
        Integer postId = jsonObject.getInt("postId");
        bhs.cancelTopPost(postId);
        return 1;
    }

    //版主删帖
    @RequestMapping("/deletePost")
    @ResponseBody
    public int deletePost(@RequestBody JSONObject jsonObject) {
        Integer postId = jsonObject.getInt("postId");
        bhs.deletePost(postId);
        return 1;
    }

    //版主可以管理的所有帖子
    @RequestMapping("/boardHostPost")
    @ResponseBody
    public BoardHostService.BoardHostPost boardHostPost(@RequestBody JSONObject jsonObject) {
        Integer userId = jsonObject.getInt("userId");
        return bhs.boardHostPost(userId);
    }

    //版主移动帖子
    @RequestMapping("/movePost")
    @ResponseBody
    public int movePost(@RequestBody JSONObject jsonObject){
        Integer postId = jsonObject.getInt("postId");
        Integer boardId = jsonObject.getInt("boardId");
        bhs.movePost(postId,boardId);
        return 1;
    }

}

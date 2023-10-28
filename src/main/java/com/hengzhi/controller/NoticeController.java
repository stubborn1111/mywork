package com.hengzhi.controller;

import com.hengzhi.entity.User;
import com.hengzhi.service.NoticeService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


@Controller
@RequestMapping("/notice")
public class NoticeController {
    @Autowired
    NoticeService ns;

    //    个人新消息数目
    @RequestMapping("/noticeNumber")
    @ResponseBody
    public NoticeService.NoticeNumber newNoticeNumber(@RequestBody JSONObject jsonObject) {
        System.out.println("个人新消息数目");
        Integer userId = jsonObject.getInt("userId");
        return ns.newNoticeNumber(userId);
    }

    //点赞，返回被点赞的帖子
    @RequestMapping("/praise")
    @ResponseBody
    public List<NoticeService.NoticeResult> praiseResult(@RequestBody JSONObject jsonObject) {
        System.out.println("返回被点赞的帖子");

        Integer userId = jsonObject.getInt("userId");
        return ns.praiseResult(userId);
    }

    //   评论，返回被评论的帖子和评论的人
    @RequestMapping("/reply")
    @ResponseBody
    public List<NoticeService.NoticeResult> collectResult(@RequestBody JSONObject jsonObject) {
        System.out.println("返回被评论的帖子和评论的人");
        Integer userId = jsonObject.getInt("userId");
        return ns.replyResult(userId);
    }

    //关注，返回用户名
    @RequestMapping("/focus")
    @ResponseBody
    public List<User> focusResult(@RequestBody JSONObject jsonObject) {
        System.out.println("返回用户名");
        Integer userId = jsonObject.getInt("userId");
        return ns.focusResult(userId);
    }

    //清空消息
    @RequestMapping("/clean")
    @ResponseBody
    public Integer clean(@RequestBody JSONObject jsonObject) {
        Integer userId = jsonObject.getInt("userId");
        String kind = jsonObject.getString("kind");
        ns.clean(userId,kind);
        return 1;
    }

}


package com.hengzhi.controller;


import com.hengzhi.entity.Notice;
import com.hengzhi.entity.Praise;
import com.hengzhi.entity.Reply;
import com.hengzhi.service.PostService;
import com.sun.prism.shader.Solid_TextureYV12_AlphaTest_Loader;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 帖子页面相关接口，7
 */
@Controller
@RequestMapping("/post")
public class PostController {
    @Autowired
    PostService postService;

    //返回帖子相关信息
    @RequestMapping("/load")
    @ResponseBody
    public PostService.PostInformation postInfo(@RequestBody JSONObject jsonObject){
        System.out.println("返回帖子相关信息");
        Integer userId = jsonObject.getInt("userId");
        Integer postId = jsonObject.getInt("postId");
        return postService.postInfo(userId,postId);
    }

    //返回帖子的回复和回复的人
    @RequestMapping("/reply")
    @ResponseBody
    public PostService.ReplyInformation replyInfo(@RequestBody JSONObject jsonObject){
        System.out.println("返回帖子的回复和回复的人");
        Integer userId = jsonObject.getInt("userId");
        Integer postId = jsonObject.getInt("postId");
        System.out.println(postService.replyInfo(userId,postId));
        return postService.replyInfo(userId,postId);
    }

    //@RequestBody JSONObject jsonObject
    //回复功能
    @RequestMapping("/postReply")
    @ResponseBody
    public int postReply(@RequestParam Integer postId,@RequestParam Integer kind,@RequestParam Integer userId, @RequestParam Integer repliedId,@RequestParam String replyInfo) {
        Reply reply = new Reply();
        reply.setKind(kind);
        reply.setPostId(postId);
        reply.setUserId(userId);
        reply.setRepliedId(repliedId);
        reply.setReplyInfo(replyInfo);
        System.out.println("回复功能");
        System.out.println(reply);
        return postService.postReply(reply);
    }

    //点赞功能
    @RequestMapping("/praise")
    @ResponseBody
    public int praise(@RequestBody Praise praise){
        System.out.println("点赞功能");
        postService.praise(praise);
        return 1;
    }

    //取消点赞
    @RequestMapping("/cancelPraise")
    @ResponseBody
    public int cancelPraise(@RequestBody Praise praise){
        System.out.println("取消点赞");
        postService.cancelPraise(praise);
        return 1;
    }

    //收藏帖子
    @RequestMapping("/collect")
    @ResponseBody
    public int collectPost(@RequestBody JSONObject jsonObject) {
        System.out.println("收藏帖子");
        Integer userId = jsonObject.getInt("userId");
        Integer postId = jsonObject.getInt("postId");
        postService.collectPost(userId,postId);
        return 1;
    }

    //取消收藏帖子
    @RequestMapping("/cancelCollect")
    @ResponseBody
    public int cancelCollectPost(@RequestBody JSONObject jsonObject) {
        System.out.println("取消收藏帖子");
        Integer userId = jsonObject.getInt("userId");
        Integer postId = jsonObject.getInt("postId");
        postService.cancelCollectPost(userId,postId);
        return 1;
    }

    @RequestMapping("/deleteReply")
    @ResponseBody
    public int deleteReply(@RequestBody JSONObject jsonObject){
        System.out.println("删除回复");
        Integer replyId = jsonObject.getInt("replyId");
        postService.deleteReply(replyId);
        return 1;
    }

}

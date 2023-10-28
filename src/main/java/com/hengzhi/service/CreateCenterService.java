package com.hengzhi.service;

import com.hengzhi.controller.CreatCenterController;
import com.hengzhi.entity.Post;
import com.hengzhi.entity.Reply;
import com.hengzhi.mapper.CreatCenterMapper;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("CreateCenterService")
public class CreateCenterService {
    @Autowired
    CreatCenterMapper creatCenterMapper;

    /*
        创作帖子管理,板块名和帖子
     */
    @Data
    public static class CreatCenterPost {
        String boardName;
        Post post;
    }

    public List<CreatCenterPost> postManage(Integer userId) {
        List<Post> list = creatCenterMapper.allPost(userId);
        List<CreatCenterPost> list1 = new ArrayList<CreatCenterPost>();
        for (int i = 0; i < list.size(); i++) {
            CreatCenterPost creatCenterPost = new CreatCenterPost();
            creatCenterPost.post = list.get(i);
            creatCenterPost.boardName = creatCenterMapper.getBoardNameByBoardId(list.get(i).getWhichBoard());
            list1.add(creatCenterPost);
        }
        return list1;
    }

    /*
        创作中心信息，给id，返回用户帖子被收藏数，点赞数，回复数
     */
    @Data
    public static class InformationResult {
        Integer collectNumber;
        Integer praiseNumber;
        Integer replyNumber;
    }

    public InformationResult CreateCenterInformation(Integer userId) {
        InformationResult ir = new InformationResult();
        ir.replyNumber = ir.praiseNumber = ir.collectNumber = 0;
        List<Integer> list1 = creatCenterMapper.getAllReplyId(userId);
        List<Integer> list = creatCenterMapper.getAllPostId(userId);
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i) != null) {
                ir.collectNumber += creatCenterMapper.postCollectNumber(list.get(i));
                ir.praiseNumber += creatCenterMapper.postPraise(list.get(i));
                ir.replyNumber += creatCenterMapper.postReplyNumber(list.get(i));

            }
        }
        for (int j = 0; j < list1.size(); j++) {
            if (list1.get(j) != null) {
                ir.praiseNumber += creatCenterMapper.replyPraise(list1.get(j));
                ir.replyNumber += creatCenterMapper.replyReplyNumber(list1.get(j));
            }
        }
        return ir;
    }

    //创作发布帖子
    public void addPost(Post post) {
        creatCenterMapper.addPost(post);
    }

    @Data
    public static class ReplyResult{
        String title;
        Reply reply;
    }
    public List<ReplyResult> allReply(Integer userId){
           List<Reply> list = creatCenterMapper.allReply(userId);
           List<ReplyResult> list1 = new ArrayList<>();
           for(int i=0;i<list.size();i++){
               ReplyResult rr = new ReplyResult();
               rr.reply = list.get(i);
               rr.title =creatCenterMapper.getPostByPostId(list.get(i).getPostId());
               list1.add(rr);
           }
           return list1;
    }


}

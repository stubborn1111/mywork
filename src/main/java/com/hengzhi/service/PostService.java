package com.hengzhi.service;

import com.hengzhi.entity.*;
import com.hengzhi.mapper.PostMapper;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("PostService")
public class PostService {
    @Autowired
    PostMapper postMapper;

    @Data
    public static class PostInformation {
        User user;
        String boardName;
        Post post;
        Integer ifPraise;//没，0，有，1,是否点赞帖子
        Integer ifCollect;//没，0，有，1，是否收藏帖子
    }

    //给帖子id，用户id，返回帖子信息，板块名，和楼主信息，用户是否点赞过
    public PostInformation postInfo(Integer userId, Integer postId) {
        PostInformation pi = new PostInformation();
        if(userId==null)userId=0;
        if (postMapper.ifPraise(userId, postId) == null) pi.ifPraise = 0;
        else pi.ifPraise = 1;
        if (postMapper.ifCollect(userId, postId) == null) pi.ifCollect = 0;
        else pi.ifCollect = 1;
        Post post = postMapper.getPostByPostId(postId);
        pi.post = post;
        pi.boardName = postMapper.getBoardNameByBoardId(post.getWhichBoard());
        pi.user = postMapper.getUserByUserId(post.getUserId());
        return pi;
    }


    @Data
    public static class ReplyInformation {
        List<User> userList;
        List<Reply> replyList;
        List<Integer> ifPraiseList;
    }

    //给帖子id，按时间返回，所有回复和回复的人的信息
    public ReplyInformation replyInfo(Integer userId, Integer postId) {
        ReplyInformation ri = new ReplyInformation();
        if(userId==null)userId=0;
        //获取所有帖子的回复
        List<Reply> list = postMapper.getReplyByPostId(postId);
        List<User> list1 = new ArrayList<>();
        //回复的人
        for (int i = 0; i < list.size(); i++) {
            list1.add(postMapper.getUserByUserId(list.get(i).getUserId()));
        }
        ri.replyList = list;
        ri.userList = list1;
        List<Integer> list2 = new ArrayList<>();

        //点赞情况
        for (int j = 0; j < list.size(); j++) {
            if (postMapper.ifPraise1(userId, list.get(j).getReplyId()) == null) {
                list2.add(0);
            } else list2.add(1);
        }
        ri.ifPraiseList = list2;
        return ri;
    }

    //回复功能，判断那个回复是否存在，并回复
    public int postReply(Reply reply) {
        int flag = 0;
        if (reply.getKind() == 1) {
            if (postMapper.getPostByPostId(reply.getPostId()) == null) {
                return flag;
            } else {
                //回复帖子1
//                reply.setKind(1);
                Integer userId = postMapper.getUserIdByPostId(reply.getPostId());
                Notice notice = new Notice(userId,reply.getPostId(),reply.getUserId(),"reply");
                postMapper.addNotice(notice);
                postMapper.addReply(reply);
                List<Integer> list = postMapper.getReplyId(reply.getUserId(), reply.getPostId());
                flag = list.get(list.size()-1);
                //积分等级
                if((postMapper.getScore(userId)+5)%50<=4)postMapper.addLevel(userId);
                postMapper.addScore(userId,5);
                return flag;
            }
        } else if (postMapper.replyExist(reply.getRepliedId()) == null) {
            return flag;
        } else {
            //回复回复0
//            reply.setKind(0);
            Integer userId = postMapper.getUserIdByPostId(reply.getPostId());
            Notice notice = new Notice(userId,reply.getPostId(),reply.getUserId(),"reply");
            postMapper.addNotice(notice);
            postMapper.addReply(reply);
            List<Integer> list = postMapper.getReplyId(reply.getUserId(), reply.getPostId());
            flag = list.get(list.size()-1);
            //积分等级
            if((postMapper.getScore(userId)+5)%50<=4)postMapper.addLevel(userId);
            postMapper.addScore(userId,5);
            return flag;
        }
    }

    //给kind(给回复点赞0，帖子1）,用户id，帖子id，回复id(不是就是给0）
    public void praise(Praise praise) {
        System.out.println(praise);
        if (praise.getKind() == 0) {
            //给回复点赞
            //增加通知和点赞
            Integer userId = postMapper.getUserIdByReplyId(praise.getReplyId());
            postMapper.addReplyPraise(praise);
            Notice notice = new Notice(userId,praise.getPostId(),praise.getUserId(),"praise");
            postMapper.addNotice(notice);
            //积分等级
            if((postMapper.getScore(userId)+2)%50<=1)postMapper.addLevel(userId);
            postMapper.addScore(userId,2);
            postMapper.addPraise1(praise.getReplyId(),1);
        } else {
            //增加通知和点赞
            Integer userId = postMapper.getUserIdByPostId(praise.getPostId());
            Notice notice = new Notice(userId,praise.getPostId(),praise.getUserId(),"praise");
            postMapper.addPostPraise(praise);
            postMapper.addNotice(notice);
            //积分等级
            if((postMapper.getScore(userId)+2)%50<=1)postMapper.addLevel(userId);
            postMapper.addScore(userId,2);
            postMapper.addPraise(praise.getPostId(),1);
        }
    }

    //取消点赞
    public void cancelPraise(Praise praise) {
        if(praise.getKind()==0) postMapper.addPraise1(praise.getReplyId(),-1);
        else postMapper.addPraise(praise.getPostId(),-1);
        postMapper.cancelPraise(praise);
    }

    //收藏帖子
    public void collectPost(Integer userId, Integer postId) {
        postMapper.addCollect(userId, postId);
    }

    //取消收藏帖子
    public void cancelCollectPost(Integer userId, Integer postId) {
        postMapper.cancelCollect(userId, postId);
    }

    //删除评论
    public void deleteReply(Integer replyId) {
        postMapper.deleteReply(replyId);
    }


}

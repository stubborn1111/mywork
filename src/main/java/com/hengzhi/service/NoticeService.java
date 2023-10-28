package com.hengzhi.service;

import com.hengzhi.entity.Notice;
import com.hengzhi.entity.Post;
import com.hengzhi.entity.User;
import com.hengzhi.mapper.NoticeMapper;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("NoticeService")
public class NoticeService {
    @Autowired
    NoticeMapper nm;

    //个人新消息数目
    @Data
    public static class NoticeNumber {
        Integer replyNumber;
        Integer praiseNumber;
        Integer focusNumber;
    }

    public NoticeNumber newNoticeNumber(Integer userId) {
        NoticeNumber nn = new NoticeNumber();
        if (nm.focusNum(userId) == null) {
            nn.focusNumber = 0;
        } else nn.focusNumber = nm.focusNum(userId);
        if (nm.praiseNum(userId) == null) {
            nn.praiseNumber = 0;
        } else nn.praiseNumber = nm.praiseNum(userId);
        if (nm.replyNum(userId) == null) {
            nn.replyNumber = 0;
        } else nn.replyNumber = nm.replyNum(userId);
        return nn;
    }

    //个人消息
    //点赞，返回被点赞的帖子
    @Data
    public static class NoticeResult {
        User user;//用户名
        Post post;//帖子
    }

    public List<NoticeResult> praiseResult(Integer userId) {
        List<Notice> list = nm.praiseResult(userId);
        List<NoticeResult> list1 = new ArrayList<>();
        if (list.size() == 1) {
            NoticeResult nr = new NoticeResult();
            nr.post = nm.getPostByPostId(list.get(0).getPostId());
            nr.user = nm.getUserByUserId(list.get(0).getSomeone());
            list1.add(nr);
        } else {
            for (int i = list.size() - 1; i > 0; i--) {
                NoticeResult nr = new NoticeResult();
                nr.post = nm.getPostByPostId(list.get(i).getPostId());
                nr.user = nm.getUserByUserId(list.get(i).getSomeone());
                list1.add(nr);
            }
        }
        return list1;
    }

    //评论，返回被评论的帖子和评论的人
    public List<NoticeResult> replyResult(Integer userId) {
        List<Notice> list = nm.replyResult(userId);
        System.out.println(list);
        List<NoticeResult> list1 = new ArrayList<>();
        if (list.size() == 1) {
            NoticeResult nr = new NoticeResult();
            nr.post = nm.getPostByPostId(list.get(0).getPostId());
            nr.user = nm.getUserByUserId(list.get(0).getSomeone());
            list1.add(nr);
        } else {
            for (int i = list.size() - 1; i > 0; i--) {
                NoticeResult nr = new NoticeResult();
                nr.post = nm.getPostByPostId(list.get(i).getPostId());
                nr.user = nm.getUserByUserId(list.get(i).getSomeone());
                list1.add(nr);
            }
        }
        System.out.println(list1);
        return list1;
    }


    //关注，返回用户名
    public List<User> focusResult(Integer userId) {
        List<Integer> list = nm.focusResult(userId);
        List<User> list1 = new ArrayList<>();
        if (list.size() == 1) {
            list1.add(nm.getUserByUserId(list.get(0)));
        } else {
            for (int i = list.size() - 1; i > 0; i--) {
                list1.add(nm.getUserByUserId(list.get(i)));
            }
        }
        return list1;
    }

    public void clean(Integer userId, String kind) {
        nm.clean(userId, kind);
    }


}

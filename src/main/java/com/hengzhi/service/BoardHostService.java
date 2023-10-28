package com.hengzhi.service;

import com.hengzhi.entity.Post;
import com.hengzhi.mapper.BoardHostMapper;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("BoardHostService")
public class BoardHostService {
    @Autowired
    BoardHostMapper boardHostMapper;

    //版主置顶
    public void topPost(Integer postId){
        boardHostMapper.topPost(postId);
    }

    //版主置顶
    public void cancelTopPost(Integer postId){
        boardHostMapper.cancelTopPost(postId);
    }

    //版主删帖
    public void deletePost(Integer postId){
        boardHostMapper.deletePost(postId);
    }

    @Data
    public static class BoardHostPost{
        String boardName;
        List<String> usernameList;
        List<Post> postList;
    }

    //版主可以管理的所有帖子
    public BoardHostPost boardHostPost(Integer userId){
        BoardHostPost bhp = new BoardHostPost();
        Integer boardId = boardHostMapper.getBoardIdByUserId(userId);
        bhp.boardName = boardHostMapper.getBoardNameByBoardId(boardId);
        List<Post> list = boardHostMapper.allPost(boardId);
        List<String> list1 = new ArrayList<>();
        for(int i=0;i<list.size();i++){
            list1.add(boardHostMapper.getUsernameByUserId(list.get(i).getUserId()));
        }
        bhp.postList = list;
        bhp.usernameList = list1;
        return bhp;
    }

    //版主移动帖子
    public void movePost(Integer postId,Integer boardId){
        boardHostMapper.movePost(postId,boardId);
    }


}

package com.hengzhi.service;


import com.hengzhi.entity.Board;
import com.hengzhi.entity.Post;
import com.hengzhi.mapper.BoardMapper;
import com.sun.org.apache.bcel.internal.generic.DMUL;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("BoardService")
public class BoardService {
    @Autowired
    private BoardMapper boardMapper;

    public String getBoardName(Integer boardId){
        return boardMapper.getBoardName(boardId);
    }

    //所有的版块
    public List<Board> allBoard() {
        return boardMapper.allBoard();
    }

    //对应板块的所有帖子
    public List<AdminService.AdminAllPost> allPostByBoardId(Integer boardId) {
        Post post = boardMapper.allPost1ByBoardId(boardId);
        List<Post> list = new ArrayList<>();
        if (post != null) list.add(post);
        List<Post> list1 = boardMapper.allPostByBoardId(boardId);
        if (list1 != null) {
            for (int i = 0; i < list1.size(); i++) {
                list.add(list1.get(i));
            }
        }
        List<AdminService.AdminAllPost> list2 = new ArrayList<AdminService.AdminAllPost>();
        for(int i=0;i<list.size();i++){
            AdminService.AdminAllPost adminAllPost = new AdminService.AdminAllPost();
            adminAllPost.post=list.get(i);
            adminAllPost.username=boardMapper.getUsernameByUserId(list.get(i).getUserId());
            adminAllPost.boardName=boardMapper.getBoardNameByBoardId(list.get(i).getWhichBoard());
            list2.add(adminAllPost);
        }
        return list2;
    }

    //对应板块的热帖
    public List<AdminService.AdminAllPost> hotPost(Integer whichBoard) {
        List<Post> list =  boardMapper.hotPost(whichBoard);
        List<AdminService.AdminAllPost> list1 = new ArrayList<AdminService.AdminAllPost>();
        for(int i=0;i<list.size();i++){
            AdminService.AdminAllPost adminAllPost = new AdminService.AdminAllPost();
            adminAllPost.post=list.get(i);
            adminAllPost.username=boardMapper.getUsernameByUserId(list.get(i).getUserId());
            adminAllPost.boardName=boardMapper.getBoardNameByBoardId(list.get(i).getWhichBoard());
            list1.add(adminAllPost);
        }
        return list1;
    }


}

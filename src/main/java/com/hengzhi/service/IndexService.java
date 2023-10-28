package com.hengzhi.service;


import com.hengzhi.entity.Board;
import com.hengzhi.entity.Post;
import com.hengzhi.entity.User;
import com.hengzhi.mapper.IndexMapper;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("IndexService")
public class IndexService {
    @Autowired
    private IndexMapper indexMapper;

    //搜索功能,通过帖子
    public List<Post> search(String query){
        System.out.println(indexMapper.search(query));
        return indexMapper.search(query);
    }

    //全局搜索
    public List<AdminService.AdminAllPost> searchAll(String query){
        System.out.println(indexMapper.searchAll(query));
        List<Post> list =  indexMapper.searchAll(query);
        List<AdminService.AdminAllPost> list1 = new ArrayList<AdminService.AdminAllPost>();
        for(int i=0;i<list.size();i++){
            AdminService.AdminAllPost adminAllPost = new AdminService.AdminAllPost();
            adminAllPost.post=list.get(i);
            adminAllPost.username=indexMapper.getUsernameByUserId(list.get(i).getUserId());
            adminAllPost.boardName=indexMapper.getBoardNameByBoardId(list.get(i).getWhichBoard());
            list1.add(adminAllPost);
        }
        return list1;
    }

    //搜索功能,通过帖主
    public List<User> searchByUser(String query){
        return indexMapper.searchByUser(query);
    }

    //获取所有板块
    public List<Board> allBoard(){
        System.out.println(indexMapper.allBoard());
        return indexMapper.allBoard();
    }

    //热帖
    public List<AdminService.AdminAllPost> hotPost(){
        List<Post> list = indexMapper.hotPost();
        List<AdminService.AdminAllPost> list1 = new ArrayList<AdminService.AdminAllPost>();
        for(int i=0;i<list.size();i++){
            AdminService.AdminAllPost adminAllPost = new AdminService.AdminAllPost();
            adminAllPost.post=list.get(i);
            adminAllPost.username=indexMapper.getUsernameByUserId(list.get(i).getUserId());
            adminAllPost.boardName=indexMapper.getBoardNameByBoardId(list.get(i).getWhichBoard());
            list1.add(adminAllPost);
        }
        return list1;
    }

    //板块精华
    public List<AdminService.AdminAllPost> hotBoardPost(){
        int whichBoard = indexMapper.boardNumber();//板块数目
        List<Post> list =new ArrayList<Post>();
        System.out.println(list);
        //在每个板块得到一个热帖
        for(int i=1;i<=whichBoard;i++){
            Post post = indexMapper.hotBoardPost(i);
            if(post!=null) list.add(post);
        }
        List<AdminService.AdminAllPost> list1 = new ArrayList<AdminService.AdminAllPost>();
        for(int i=0;i<list.size();i++){
            AdminService.AdminAllPost adminAllPost = new AdminService.AdminAllPost();
            adminAllPost.post=list.get(i);
            adminAllPost.username=indexMapper.getUsernameByUserId(list.get(i).getUserId());
            adminAllPost.boardName=indexMapper.getBoardNameByBoardId(list.get(i).getWhichBoard());
            list1.add(adminAllPost);
        }
        return list1;
    }

    //推荐帖主
    public List<User> hotPoster(){
        List<Post> list =new ArrayList<Post>();
        list = indexMapper.hotPoster();
        List<User> list1 =new ArrayList<User>();
        for(int i=0;i<list.size();i++){
            int flag =0;
            for(int j=0;j<i;j++){
                if(list.get(j).getUserId()==list.get(i).getUserId())flag++;
            }
            if(flag==0){
                User user = new User();
                user.setUserId(list.get(i).getUserId());
                if(user!=null){
                    list1.add(user);
                }
            }
            if(list1.size()==4)break;
        }
        List<User> list2 = new ArrayList<User>();
        for(int k=0;k<list1.size();k++){
            if(indexMapper.getUserById(list1.get(k).getUserId())!=null){
                list2.add(indexMapper.getUserById(list1.get(k).getUserId()));
            }
        }
        return list2;
    }
}

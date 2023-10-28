package com.hengzhi.mapper;

import com.hengzhi.entity.Post;
import com.hengzhi.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 *用户登录注册个人信息修改Mapper接口
 */

@Repository
public interface UserMapper {
    //登录，判断用户是否已存在
    public User loginAboutUser (@Param("username") String username, @Param("password")String password);

    //用户名查重
    public User usernameCheck(@Param("username") String username);

    //注册
    public void userRegist(@Param("username") String username, @Param("password")String password);

    //返回热帖
    public Post hotPost();

    //根据板块id，返回板块名字
    public String getBoardNameByBoardId(Integer boardId);


}

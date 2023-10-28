package test;

import com.hengzhi.entity.User;
import com.hengzhi.service.BoardService;
import com.hengzhi.service.UserService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestUserService {
    //随机热帖
    @Test
    public void run1(){
        // 加载配置文件
        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        UserService us = (UserService)ac.getBean("UserService");
        System.out.println(us.hotPost());
//        System.out.println(us.hotPost().getInfo());
    }

    @Test
    public void run2(){
        // 加载配置文件
        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        BoardService bs = (BoardService)ac.getBean("BoardService");
        System.out.println(bs.allPostByBoardId(1));
//        System.out.println(us.hotPost().getInfo());
    }
}

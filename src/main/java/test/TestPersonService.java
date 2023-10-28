package test;

import com.hengzhi.entity.Post;
import com.hengzhi.service.PersonService;
import com.hengzhi.service.UserService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.Date;

public class TestPersonService {
    //取消关注
    @Test
    public void run1(){
        // 加载配置文件
        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        PersonService ps = (PersonService)ac.getBean("PersonService");
        ps.cancelFocus(1,2);
    }

    //增加帖子
    @Test
    public void run2(){
        // 加载配置文件
        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        PersonService ps = (PersonService)ac.getBean("PersonService");
        Post post = new Post();
        post.setTitle("熬夜猝死");
        post.setInfo("熬夜猝死熬夜猝死熬夜猝死熬夜猝死熬夜猝死熬夜猝死");
        post.setUserId(3);
        post.setWhichBoard(1);
        ps.addPost(post);
    }
}

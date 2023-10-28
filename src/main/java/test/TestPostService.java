package test;


import com.hengzhi.service.PostService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestPostService {

    @Test
    public void run1(){
        // 加载配置文件
        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        PostService ps = (PostService)ac.getBean("PostService");
        System.out.println(ps.postInfo(3,4));
    }

    @Test
    public void run2(){
        // 加载配置文件
        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        PostService ps = (PostService)ac.getBean("PostService");
        System.out.println(ps.replyInfo(4,4));
    }

    @Test
    public void run3(){
        // 加载配置文件
        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        PostService ps = (PostService)ac.getBean("PostService");
        System.out.println(ps);
    }

}

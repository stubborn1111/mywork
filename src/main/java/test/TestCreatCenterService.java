package test;

import com.hengzhi.entity.Post;
import com.hengzhi.service.CreateCenterService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestCreatCenterService {

    @Test
    public void run1(){
        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        CreateCenterService ccs = (CreateCenterService) ac.getBean("CreateCenterService");
        System.out.println(ccs.postManage(3));
        System.out.println(ccs.CreateCenterInformation(4));
        Post post = new Post("ceshi","测试测试测试",4,"NO","0",1);
        ccs.addPost(post);
    }



}

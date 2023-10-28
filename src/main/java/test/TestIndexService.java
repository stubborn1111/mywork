package test;

import com.hengzhi.service.IndexService;
import com.hengzhi.service.UserService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestIndexService {

    //搜索功能
    @Test
    public void run1() {
        // 加载配置文件
        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        IndexService is = (IndexService) ac.getBean("IndexService");
        System.out.println(is.search("转义"));
    }

    //获取所有板块
    @Test
    public void run2() {
        // 加载配置文件
        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        IndexService is = (IndexService) ac.getBean("IndexService");
        System.out.println(is.allBoard());
    }
}

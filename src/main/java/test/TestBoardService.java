package test;

import com.hengzhi.service.BoardService;
import com.hengzhi.service.PersonService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestBoardService {
    //特定板块所有帖子
    @Test
    public void run1(){
        // 加载配置文件
        ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        BoardService bs = (BoardService)ac.getBean("BoardService");
        System.out.println("特定板块所有帖子:"+bs.allPostByBoardId(1));

    }
}

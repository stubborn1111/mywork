package test;

import com.hengzhi.utils.JedisUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import com.hengzhi.utils.BaseJUnit4Test;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Transaction;

/**
 * redis测试,jedisUtils,redis事务
 */
@ContextConfiguration(locations = {"classpath:applicationContext.xml", "classpath:springmvc.xml"})
//RunWith的value属性指定以spring test的SpringJUnit4ClassRunner作为启动类
//如果不指定启动类，默认启用的junit中的默认启动类
@RunWith(value = SpringJUnit4ClassRunner.class)
public class RedisTest extends BaseJUnit4Test {

    @Test
    public void testRedis1() {
        JedisUtils jedisUtils = new JedisUtils();
        jedisUtils.getInstence();
        Jedis jedis = jedisUtils.getJedis();
        jedis.set("name1", "yangyang");

//        Jedis jedis = new Jedis("127.0.0.1",6379);
//        System.out.println("JEDIS.ping:"+jedis.ping());
        System.out.println("查看name1是否存在" + jedis.get("name1"));
//        String name = (String) redisTemplate.opsForValue().get("name");
//        System.out.println("value of name is" + name);
    }

    /**
     * redis事务测试
     */
    @Test
    public void testRedis2() {
        //创建Jedis实例，连接Redis本地服务
        Jedis jedis = new Jedis("127.0.0.1", 6379);
        System.out.println("开启Redis事务");
        //1.使用MULTI命令开启事务
        Transaction transaction = jedis.multi();
        //2.事务命令入队
        transaction.set("userName", "liuhefei"); //设置键 userName
        transaction.set("age", "24");
        //设置键age
        transaction.set("city", "shenzhen");
        //设置键city
        transaction.get("userName");
        //获取键userName的值
        //将userName键所存储的值加上增量5，将会报错，事务执行失败
        //原因是:值包含错误的类型，或字符串类型的值不能表示为数字
        transaction.incrBy("userName", 5);
        //将age键所存储的值加上增量5，事务正确执行
        transaction.incrBy("age", 5);
        //3.使用EXEC命令执行事务
        transaction.exec();
        //取消执行事务
        transaction.close();
        System.out.println("redis事务执行结束");

        //获取事务中的值
        System.out.println("用户名；" + jedis.get("userName"));
        System.out.println("年龄；" + jedis.get("age"));
        System.out.println("所在城市；" + jedis.get("city"));

    }

    @Override
    public void test() {
    }
}

package test;

import com.hengzhi.utils.JedisUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import redis.clients.jedis.Jedis;

import java.util.List;

/**
 * redis测试，jedis操作redis数据类型
 */
@ContextConfiguration(locations = {"classpath:applicationContext.xml", "classpath:springmvc.xml"})
//RunWith的value属性指定以spring test的SpringJUnit4ClassRunner作为启动类
//如果不指定启动类，默认启用的junit中的默认启动类
@RunWith(value = SpringJUnit4ClassRunner.class)
public class RedisTest4 {
    /**
     * redis的key类型
     */
    @Test
    public void redisTest1() {
        JedisUtils jedisUtils = new JedisUtils();
        jedisUtils.getInstence();
        Jedis jedis = jedisUtils.getJedis();
        jedis.set("mykey", "redis data type");
        System.out.println("查看键为mykey的值是否存在: " + jedis.exists("mykey"));
        System.out.println("键mykey的值为: " + jedis.get("mykey"));
        System.out.println("查看键为mykey的类型: " + jedis.type("mykey"));
        System.out.println("随机获得一个key: " + jedis.randomKey());
        System.out.println("将mykey重命名为 mykey1:" + jedis.rename("mykey", "mykey1"));
        System.out.println("删除key为mykey：" + jedis.del("mykey"));
        jedisUtils.closeJedis(jedis);
    }


    /**
     * redis的string类型
     */
    @Test
    public void redisTest2() {
        JedisUtils jedisUtils = new JedisUtils();
        jedisUtils.getInstence();
        Jedis jedis = jedisUtils.getJedis();
        System.out.println("设置name: " + jedis.set("name", "小花"));
        System.out.println("设置name1: " + jedis.set("name1", "小花1"));
        System.out.println("设置name2: " + jedis.set("name2", "小花2"));
        System.out.println("设置name,如果存在返回0: " + jedis.setnx("name", "小花哈哈"));
        System.out.println("获取key为name和name1的value值: " + jedis.mget("name", "name1"));
        System.out.println("自增1: " + jedis.incr("index"));
        System.out.println("自增1: " + jedis.incr("index"));
        System.out.println("自增2: " + jedis.incrBy("count", 2));
        System.out.println("自增2: " + jedis.incrBy("count", 2));
        System.out.println("递减1: " + jedis.decr("count"));
        System.out.println("递减2: " + jedis.decrBy("index", 2));
        System.out.println("在name后面添加String: " + jedis.append("name", ",我爱你"));
        System.out.println("获取key为name的值: " + jedis.get("name"));
        jedisUtils.closeJedis(jedis);
    }

    /**
     * redis的list类型
     */
    @Test
    public void redisTest3() {
        JedisUtils jedisUtils = new JedisUtils();
        jedisUtils.getInstence();
        Jedis jedis = jedisUtils.getJedis();
        //在列表的头部添加数据
        jedis.lpush("list", "姗姗", "age", "20", "address", "beijing");
        //在列表的尾部添加数据
        jedis.rpush("list","height", "170cm", "cupSize", "C罩杯");
        //返回长度
        System.out.println("列表长度:" + jedis.llen(" list"));
        System.out.println("列表list下标为2的元素:" + jedis.lindex(" list", 2));
        System.out.println("移除一-个元素: " + jedis.lrem(" list", 1, " age"));
        System.out.println("将列表key下标为index的元素的值设置为value: " + jedis.lset("list", 5, "hello world"));
        System.out.println("移除并返回列表list的尾元素:" + jedis.rpop(" list"));
        //取值
        List<String> list = jedis.lrange("list", 0, -1);
        for (String str : list) {
            System.out.println(str);
        }
        //System. out.println("删除key为list的数据"+jedis.del ("list"));
        System.out.println("删除key为height的数据" + jedis.del("height"));
        jedisUtils.closeJedis(jedis);

    }
}

package test;

import com.hengzhi.utils.JedisUtils;
import org.junit.Test;
import org.omg.PortableInterceptor.ACTIVE;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * jedis连接池
 */
public class RedisTest3 {
    //Redis服务器IP地址
    private static String ADDR = "127.0.0.1";
    //Redis的端口号
    private static int PORT = 6379;
    //可用连接实例的最大数目，默认值为8
    //如果赋值为-1，则表示不限制
    //如果连接池已经分配了maxActive个Jedis实例，则此时连接池的状态为exhausted(耗尽)
    private static int MAX_ACTIVE = 1024;
    //控制一一个连接池最多有多少个状态为idle (空闲的)的Jedis实例，默认值也是8
    private static int MAX_IDLE = 200;
    //等待可用连接的最大时间，单位为毫秒。默认值为-1,表示永不超时
    //如果超过等待时间，则直接抛出JedisConnectionException异常
    private static int MAX_WAIT = 10000;
    //在分配一个Jedis实例时，是否提前进行验证操作
    //如果为true,则得到的Jedis实例均是可用的
    private static boolean TEST_ON_BORROW = true;
    //在返回一个Jedis实例给连接池时，是否检查连接可用性(ping() )
    private static boolean TEST_ON_RETURN = true;
    private static JedisPool jedisPool = null;

    /**
     * 初始化Redis连接池
     */
    public static JedisPool getJedisPoolInstance() {
        if (null == jedisPool) {
            //同步锁
            synchronized (JedisUtils.class) {
                if (null == jedisPool) {
                    //Jedis连接池的配置
                    JedisPoolConfig poolConfig = new JedisPoolConfig();
                    poolConfig.setMaxTotal(MAX_ACTIVE);
                    poolConfig.setMaxIdle(MAX_IDLE);
                    poolConfig.setMaxWaitMillis(MAX_WAIT);
                    poolConfig.setTestOnBorrow(TEST_ON_BORROW);
                    poolConfig.setTestOnReturn(TEST_ON_RETURN);
                    jedisPool = new JedisPool(poolConfig, ADDR, PORT);
                }
            }
        }
        return jedisPool;
    }

    /**
     * 获取Jedis实例
     *
     * @return
     */
    public synchronized static Jedis getJedis() {
        try {
            if (jedisPool != null) {
                Jedis resource = jedisPool.getResource();
                return resource;
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 释放Jedis资源
     *
     * @param jedis
     */
    public static void releaseResource(final Jedis jedis) {
        if (jedis != null) {
            jedisPool.close();
        }
    }

    @Test
    public void redisTest() {

        JedisPool jedisPool = RedisTest3.getJedisPoolInstance();
        JedisPool jedisPool2 = RedisTest3.getJedisPoolInstance();
        System.out.println(jedisPool == jedisPool2);
        Jedis jedis = null;
        try {
            //获取Jedis实例
            jedis = RedisTest3.getJedis();
            jedis.set("message", "Redis连接池");
            System.out.println(jedis.get("message"));
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //释放Jedis连接资源
            RedisTest3.releaseResource(jedis);
        }

    }
}

package com.hengzhi.utils;


import org.mybatis.caches.redis.SerializeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class JedisUtils {
    private static Logger logger = LoggerFactory.getLogger(JedisUtils.class);

    private static JedisPool JEDISPOOL;

    //创建缓存池
    public static void getInstence() {
        if (JEDISPOOL == null) {
            logger.info("JeidsUtils getInstence...");
            try {
                JedisPoolConfig conf = new JedisPoolConfig();
                conf.setMaxIdle(ConfigUtils.maxIdle);
                conf.setTestOnBorrow(ConfigUtils.testOnBorrow);
                //当配置中配置有password时，则创建带密码的缓存池
                if (ConfigUtils.password != null && !"".equals(ConfigUtils.password)) {
                    JEDISPOOL = new JedisPool(conf, ConfigUtils.ip, ConfigUtils.port, ConfigUtils.timeout, ConfigUtils.password);
                } else {
                    //没有配置则用无密码的缓存池。
                    JEDISPOOL = new JedisPool(conf, ConfigUtils.ip, ConfigUtils.port, ConfigUtils.timeout);
                }
            } catch (Exception e) {
                logger.error("加载【jedis.properties】异常,异常信息为：" + e.getMessage());
            }
        }
    }

    //从jedispool中得到jedis
    public static Jedis getJedis() {
        try {
            return JEDISPOOL.getResource();
        } catch (Exception e) {
            return null;
        }
     }

    //关闭jedis
    public static void closeJedis(Jedis jedis) {
        if (jedis != null) {
            jedis.quit();
        }
    }

    //关闭jedispool
    public static void closeJedisPool() {
        if (JEDISPOOL != null) {
            JEDISPOOL.destroy();
        }
    }

    //redis 序列化存储Object，hash
    public static void put(String id, Object key, Object value) {
        Jedis jedis = getJedis();
        logger.info("redis put ... key =[" + key + "]");
        try {
            jedis.hset(SerializeUtil.serialize(id), SerializeUtil.serialize(key), SerializeUtil.serialize(value));
            ConfigUtils.setSucc();
        } catch (Exception e) {
            ConfigUtils.setFail();
            logger.error("redis执行异常【" + e.getMessage() + "】");
        } finally {
            closeJedis(jedis);
        }
    }

    //获取hash
    public static Object get(String id, Object key) {
        Jedis jedis = getJedis();
        try {
            Object object = SerializeUtil.unserialize(jedis.hget(SerializeUtil.serialize(id), SerializeUtil.serialize(key)));
            logger.info("redis get ... key=[" + key + "],value=[" + object + "]");
            ConfigUtils.setSucc();
            return object;
        } catch (Exception e) {
            ConfigUtils.setFail();
            logger.error("Redis执行异常【" + e.getMessage() + "】");
        } finally {
            closeJedis(jedis);
        }
        return null;
    }

    //移除
    public static Long remove(String id, Object key) {
        Jedis jedis = getJedis();
        try {
            Long num = jedis.hdel(id.toString(), key.toString());
            ConfigUtils.setSucc();
            return num;
        } catch (Exception e) {
            ConfigUtils.setFail();
            logger.error("Redis执行异常，异常信息：" + e.getMessage());
        } finally {
            closeJedis(jedis);
        }
        return 0l;
    }

    public static int removeAll(String id) {
        Jedis jedis = getJedis();
        try {
            jedis.del(id.toString());
            ConfigUtils.setSucc();
        } catch (Exception e) {
            ConfigUtils.setFail();
            logger.error("Redis执行异常【" + e.getMessage() + "】");
        } finally {
            closeJedis(jedis);
        }
        return -1;
    }


    public static int getSize(String id) {
        Jedis jedis = getJedis();

        try {
            return jedis.hgetAll(SerializeUtil.serialize(id)).size();
        } catch (Exception e) {
            ConfigUtils.setFail();
            logger.error("Redis执行异常【" + e.getMessage() + "】");
        } finally {
            closeJedis(jedis);
        }
        return -1;
    }


//    private static Jedis jedis;
//
//    //初始化
//    private static void init() {
//        jedis = new Jedis("localhost");
//    }

    //在redis中设置键值对存储
    public static void setToken(String id, String token, int day) {
        Jedis jedis = getJedis();
        int second = day * 60 * 60 * 24;
        jedis.set(String.valueOf(id), token); //根据id存储token
        jedis.expire(String.valueOf(id), second);  //设置token持续时间
    }

    public static String getToken(String id) {
        Jedis jedis = getJedis();
        String token = jedis.get(String.valueOf(id));  //获取token
        return token;
    }

}

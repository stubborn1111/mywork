package test;

import org.junit.Test;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Transaction;

/**
 * redis测试1.简单链接
 */
public class RedisTest2 {
    //创建jedis实例
    private static Jedis jedis = new Jedis("127.0.0.1", 6379);

//    /**
//     * 购物
//     *
//     * @param goodsName 购买的商品名称
//     * @param balanceA 付款方余额
//     * @param price 购买的商品价格
//     * @param balanceB 收款方余额
//     * @param return
//     * @throws InterruptedException
//     *
//     * @author yang 2020.10.12
//     */

    @Test
    public void testRedis1() throws InterruptedException {
        RedisTest2 goShopping = new RedisTest2();
        int balanceA = 0; //付款方账户 余额
        int balanceB = 0; //收款方账户余额
        int bookPrice = 40;//图书价格
        int bagPrice = 70; //书包价格
        String goodsNamel = "图书";
        String goodsName2 = "书包";
        //初始化银行卡余额为100元
        jedis.set ("balanceA", "100");
        System.out.println ("去购买图书");
        goShopping. shopping (goodsNamel, balanceA, bookPrice, balanceB) ;
        System. out. println("\n\n去购买书包");
        goShopping. shopping (goodsName2, balanceA, bookPrice, balanceB);



    }

    public boolean shopping(String goodsName, int balanceA, int price, int balanceB) throws InterruptedException {
        //使用WATCH命令监控balanceA键
        jedis.watch("balanceA");
        //获取Redis数据库中balanceA键的值，并转化为整型
        balanceA = Integer.parseInt(jedis.get("balanceA"));
        //如果付款方余额小于所要购买的图书价格，则取消对balanceA键的监控
        //提示余额不足，购买图书失败
        if (balanceA < price) {
            jedis.unwatch();
            System.out.println("余额不足，购买" + goodsName + "失败");
            return false;
        } else {
            System.out.println("******开始购物 ******");
            System.out.println("购买:" + goodsName);
            //1.使用MULTI命令开启事务
            Transaction transaction = jedis.multi();
            //2.事务命令入队
            transaction.decrBy("balanceA", price); //付款方 余额减去支付的金额
            transaction.incrBy("balanceB", price); //收款方余额加上支付的金额
            //3.使用EXEC命令执行事务
            transaction.exec();
            //购买成功之后
            balanceA = Integer.parseInt(jedis.get("balanceA"));
            balanceB = Integer.parseInt(jedis.get("balanceB"));
            System.out.println(goodsName + "购买成功");
            System.out.println("付款方余额:" + balanceA);
            System.out.println("收款方余额:" + balanceB);
            return true;
        }
    }
}

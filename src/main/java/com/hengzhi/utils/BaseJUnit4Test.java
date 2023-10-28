package com.hengzhi.utils;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.BlockJUnit4ClassRunner;

@RunWith(BlockJUnit4ClassRunner.class)
public abstract class BaseJUnit4Test {
    public BaseJUnit4Test() {
    }

    /**
     * Test执行之前调用，可以做一些初始化操作。
     */
    @Before
    public void before(){
    }

    /**
     * Test执行完成后调用，可以做一些回收和销毁操作。
     */
    @After
    public void after(){
    }

    /**
     * 具体的测试方法
     */
    @Test
    public abstract void test();
}

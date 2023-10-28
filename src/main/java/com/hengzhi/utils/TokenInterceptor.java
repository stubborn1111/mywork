package com.hengzhi.utils;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

/**
 * @author yang
 * @date 2020/10/13
 * 此处拦截器
 */
public class TokenInterceptor implements HandlerInterceptor {
    /**
     * 拦截器和过滤器的区别
     * 1.拦截器针对访问控制器进行拦截
     * 及 @RequestMapping(value = {"/test"})
     * 简而言说就是访问方法的url
     * 应用：可以作为权限的判断，
     * 2.过滤器则是针对全局的请求
     * 包括：css/js/html/jpg/png/git/...
     * 及静态文件
     */

    private JedisUtils jedisUtils = new JedisUtils();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //获取页面携带的token
        String token = request.getHeader("token");
        //通过token查看是否存在此用户
        String s = null;
        try {
            jedisUtils.getInstence();
            s = jedisUtils.getJedis().get(token);
            if (s.equals("") || s == null) {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
        return true;
    }

}




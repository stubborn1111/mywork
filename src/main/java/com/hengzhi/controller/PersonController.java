package com.hengzhi.controller;

import com.hengzhi.entity.Board;
import com.hengzhi.entity.FavoritePeople;
import com.hengzhi.entity.Post;
import com.hengzhi.entity.User;
import com.hengzhi.service.AdminService;
import com.hengzhi.service.PersonService;
import lombok.Data;
import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.omg.Messaging.SYNC_WITH_TRANSPORT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Encoder;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * 用户个人页面的功能的控制，13
 */
@Controller
@RequestMapping("/person")
public class PersonController {
    @Autowired
    PersonService personService;

    //修改密码
    @RequestMapping("/information")
    @ResponseBody
    public User information(@RequestBody JSONObject jsonObject) {
        Integer userId = jsonObject.getInt("userId");
        return personService.information(userId);
    }


    @Data
    public static class UserUpdate {
        Integer userId;
        String password;
        String newpwd;
    }

    //修改密码
    @RequestMapping("/updatepassword")
    @ResponseBody
    public Integer userUpdate(@RequestBody UserUpdate userUpdate, HttpServletRequest request) {
        HttpSession session = request.getSession();
        System.out.println("修改密码controller");
        User user = new User();
        user.setUserId(userUpdate.userId);
        user.setPassword(userUpdate.newpwd);
        System.out.println(user);
        System.out.println("********************");
        if (personService.getUserByCollectId(userUpdate.userId).getPassword().equals(userUpdate.password)) {
            personService.userUpdate(user);
            session.invalidate();
            return 1;
        } else return 0;
    }


    //上传修改头像
    @RequestMapping("/changeheadImage")
    @ResponseBody
    public String updateHeadImage(@RequestParam(value = "headImage", required = false) MultipartFile headImage, HttpServletRequest request) {
        System.out.println("changeHeadImage3");
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        System.out.println("头像：" + user);
        String flag = "0";
        System.out.println(headImage);
        if (!headImage.isEmpty()) {
            String filePath = request.getServletContext().getRealPath("/headImage");
            String originalFilename = headImage.getOriginalFilename();
            System.out.println(originalFilename);
            // UUID随机重命名
            String newFileName = (UUID.randomUUID() + originalFilename
                    .substring(originalFilename.indexOf("."))).replace("-", "");
//            String newFileName=UUID.randomUUID()+"_"+originalFilename;
            System.out.println(newFileName);
            // 新文件
            File file = new File(filePath, newFileName);
            // 将文件写入磁盘
            try {
                if (!file.exists()) {
                    file.mkdirs();
                }
                headImage.transferTo(file);
                // 将图片名字写入数据库
                user.setHeadImageUrl(newFileName);
                personService.userUpdate(user);

            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
            User user1 = new User();
            user1 = personService.getUserByCollectId(user.getUserId());
            session.setAttribute("user", user1);
            flag = newFileName;
            System.out.println(newFileName);
            return flag;
        } else {
            System.out.println("文件为空");
            // 返回上传页面
            return flag;
        }
    }


    //个人页面关注的人
    @RequestMapping("/focus")
    @ResponseBody
    public List<User> focus(@RequestBody User user) {
        System.out.println("个人页面关注的人");
        System.out.println(user);
        System.out.println(user.getUserId());
        List<Integer> list = personService.focus(user.getUserId());
        List<User> list1 = new ArrayList<User>();
        int size = (int) list.size();
        for (int i = 0; i < size; i++) {
            int a = list.get(i);
            list1.add(personService.getUserByCollectId(a));
        }
        System.out.println(list1);
        return list1;
    }

    //用户的粉丝
    @RequestMapping("/fans")
    @ResponseBody
    public List<User> fans(@RequestBody User user) {
        System.out.println("用户的粉丝");
        System.out.println(user);
        List<Integer> list = personService.fans(user.getUserId());
        System.out.println(list);
        List<User> list1 = new ArrayList<User>();
        int size = list.size();
        for (int i = 0; i < size; i++) {
            int a = list.get(i);
            list1.add(personService.getUserByCollectId(a));
        }
        System.out.println(list1);
        System.out.println("-------");
        return list1;
    }

    //个人页面好友
    @RequestMapping("/friend")
    @ResponseBody
    public List<User> friend(@RequestBody JSONObject jsonObject) {
        System.out.println("friend");
        Integer userId = jsonObject.getInt("userId");
        System.out.println("USERiD" + userId);
        System.out.println("-------");
        return personService.friend(userId);
    }

    //个人的帖子
    @RequestMapping("/allPost")
    @ResponseBody
    public List<AdminService.AdminAllPost> allPost(@RequestBody JSONObject jsonObject) {
        System.out.println("PERSON ALLPOST");
        Integer userId = jsonObject.getInt("userId");
        System.out.println("USERID:" + userId);
        return personService.allPost(userId);
    }

    //个人的帖子
    @RequestMapping("/allPost1")
    @ResponseBody
    public List<AdminService.AdminAllPost> allPost1(@RequestBody JSONObject jsonObject) {
        System.out.println("PERSON ALLPOST");
        Integer userId = jsonObject.getInt("userId");
        System.out.println("USERID:" + userId);
        return personService.allPost(userId);
    }

    //个人页面收藏的帖子
    @RequestMapping("/collect")
    @ResponseBody
    public List<AdminService.AdminAllPost> collect(@RequestBody User user) {
        System.out.println("个人页面收藏的帖子");
        System.out.println(user);
        System.out.println(personService.collect(user.getUserId()));
        return personService.collect(user.getUserId());
    }

    @Data
    private static class CancelColl {
        private Integer userId;
        private Integer postId;
    }

    //个人页面取消收藏帖子
    @RequestMapping("/cancelcollect")
    @ResponseBody
    public Integer cancelCollect(@RequestBody CancelColl cancelColl) {
        System.out.println("cancelColl:" + cancelColl.userId + "------" + cancelColl.postId);
        personService.cancelCollect(cancelColl.userId, cancelColl.postId);
        return 1;
    }

    //关注
    @RequestMapping("/focusPerson")
    @ResponseBody
    public int focusPerson(@RequestBody JSONObject jsonObject) {
        Integer userId = jsonObject.getInt("userId");
        Integer userId1 = jsonObject.getInt("userId1");
        personService.focusPerson(userId, userId1);
        return 1;
    }


    //个人页面取消关注
    @RequestMapping("/cancelFocus")
    @ResponseBody
    public void cancelFocus(@RequestBody JSONObject jsonObject) {
        Integer userId = jsonObject.getInt("userId");
        Integer userId1 = jsonObject.getInt("userId1");//被关注的那个
        personService.cancelFocus(userId, userId1);
    }

    //增加帖子
    @RequestMapping("/addPost")
    @ResponseBody
    public Integer addPost(@RequestParam Integer userId, @RequestParam Integer boardId, @RequestParam String title, @RequestParam String whetherFile, @RequestParam String info, @RequestParam MultipartFile multipartFile, HttpServletRequest request) {
        Post post = new Post(title, info, userId, boardId, whetherFile);
        System.out.println("post是:" + post);
        Integer flag = 0;
        System.out.println(multipartFile);
        if (!multipartFile.isEmpty()) {
            System.out.println("fffrg");
            String filePath = request.getServletContext().getRealPath("/download");
            String originalFilename = multipartFile.getOriginalFilename();
            // UUID随机重命名
            String newFileName = (UUID.randomUUID() + originalFilename
                    .substring(originalFilename.indexOf("."))).replace("-", "");
            System.out.println(newFileName);
            // 新文件
            File file = new File(filePath, newFileName);
            // 将文件写入磁盘
            try {
                if (!file.exists()) {
                    file.mkdirs();
                }
                multipartFile.transferTo(file);
                // 将图片名字写入数据库
                post.setFileUrl(newFileName);
                flag = personService.addPost(post);
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("文件为空");
            // 返回上传页面
        }
        System.out.println("flag:" + flag);
        return flag;
    }

    //增加帖子
    @RequestMapping("/addPost1")
    @ResponseBody
    public Integer addPost(@RequestParam Integer userId, @RequestParam Integer boardId, @RequestParam String title, @RequestParam String whetherFile, @RequestParam String info, HttpServletRequest request) {
        Post post = new Post(title, info, userId, boardId, whetherFile);
        System.out.println("post是:" + post);
        Integer flag = 0;
        post.setFileUrl("0");
        flag = personService.addPost(post);
        System.out.println("flag:" + flag);
        return flag;
    }

    //增加帖子页面要求板块
    @RequestMapping("/addpost1")
    @ResponseBody
    public List<Board> allBoard() {
        return personService.allBoard();
    }

    //注销账户
    @RequestMapping("/unsubscibe")
    @ResponseBody
    public int unsubscibe(@RequestBody JSONObject jsonObject) {
        System.out.println("unsubscibe");
        Integer userId = jsonObject.getInt("userId");
        System.out.println(userId);
        personService.unsubscibe(userId);
        return 1;
    }

    //是否是本人以及是否关注过
    @RequestMapping("/ifSelf")
    @ResponseBody
    public int ifSelf(@RequestBody JSONObject jsonObject) {
        Integer userId = jsonObject.getInt("userId");//
        Integer userId1 = jsonObject.getInt("userId1");
        return personService.ifSelf(userId, userId1);
    }

    //文件下载
    @RequestMapping("/download")
    @ResponseBody
    public void fileDownload(@RequestParam(value = "fileName", required = false) String fileName, HttpServletRequest request,
                             HttpServletResponse response,
                             HttpSession session) throws Exception {
        /*******************1.接收请求参数***********************************/
        //获取文件名,接收文件名参数

        /*******************2.对接收的参数进行编码处理**************************/
        /**因为使用的是UTF-8的编码形式，所以不需要进行转码**/
        //获取参数 ，默认会对参数进行编码 ISO8859-1
        //把乱码转回二进制位
        // byte[] bytes = name.getBytes("ISO8859-1");
        //再去使用UTF-8进行编码
        // name = new String(name.getBytes(),"UTF-8");

        /*******************3.告诉浏览器响应的文件的类型*************************/
        // 根据文件名来获取mime类型
        String mimeType = session.getServletContext().getMimeType(fileName);
        // 设置 mimeType
        response.setContentType(mimeType);

        /*******************4.告诉浏览器以附件的形式下载*************************/
        // 获取客户端信息
        String agent = request.getHeader("User-Agent");
        // 定义一个变量记录编码之后的名字
        String filenameEncoder = "";
        if (agent.contains("MSIE")) {
            // IE编码
            filenameEncoder = URLEncoder.encode(fileName, "utf-8");
            filenameEncoder = filenameEncoder.replace("+", " ");
        } else if (agent.contains("Firefox")) {
            // 火狐编码
            BASE64Encoder base64Encoder = new BASE64Encoder();
            filenameEncoder = "=?utf-8?B?" + base64Encoder.encode(fileName.getBytes("utf-8")) + "?=";
        } else {
            // 浏览器编码
            filenameEncoder = URLEncoder.encode(fileName, "utf-8");
        }
        // 告诉浏览器是以附件形式来下载 不要解析
        response.setHeader("Content-Disposition", "attachment;filename=" + filenameEncoder);

        /*******************5.输出对应的流*************************/
        //获取文件的绝对路径,拼接文件的路径
        String path = session.getServletContext().getRealPath("download/" + fileName);
        System.out.println("下载文件的路径" + path);
        //写入流中
        FileInputStream is = new FileInputStream(path);
        //获取相应的输出流
        ServletOutputStream os = response.getOutputStream();
        byte[] b = new byte[1024];
        int len;
        //写入浏览器中
        while ((len = is.read(b)) != -1) {
            os.write(b, 0, len);
        }
        //关闭对应的流
        os.close();
        is.close();
    }
}

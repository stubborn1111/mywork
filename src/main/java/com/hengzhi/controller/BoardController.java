package com.hengzhi.controller;

import com.hengzhi.entity.Board;
import com.hengzhi.entity.Post;
import com.hengzhi.service.AdminService;
import com.hengzhi.service.BoardService;
import com.hengzhi.service.IndexService;
import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 进入具体板块相关接口，3
 */
@Controller
@RequestMapping("/board")
public class BoardController {
    @Autowired
    private BoardService boardService;

    //给板块名
    @RequestMapping("/boardName")
    @ResponseBody
    public JSONObject getBoardName(@RequestBody JSONObject jsonObject){
        Integer boardId = jsonObject.getInt("boardId");
        String flag = boardService.getBoardName(boardId);
        JSONObject json = new JSONObject();
        json.accumulate("flag",flag);
        return json;
    }

    //所有板块
    @RequestMapping("/boardload")
    @ResponseBody
    public List<Board> allBoard() {
        return boardService.allBoard();
    }

    //板块的热帖
    @RequestMapping("/hotPost")
    @ResponseBody
    public List<AdminService.AdminAllPost> hotPost(@RequestBody JSONObject jsonObject) {
        Integer whichBoard = jsonObject.getInt("boardId");
        return boardService.hotPost(whichBoard);
    }

    //对应板块的所有帖子
    @RequestMapping("/allPost")
    @ResponseBody
    public List<AdminService.AdminAllPost> allPost(@RequestBody JSONObject jsonObject) {
        Integer whichBoard = jsonObject.getInt("boardId");
        return boardService.allPostByBoardId(whichBoard);
    }
}

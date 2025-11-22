package com.ruoyi.acecoin.domain.entity;


import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;


@Data
@TableName("messages")
public class Messages {
    @TableId("id")
    private Integer id; // 消息ID
    private String coinId; // 币种
    private String title; // 标题
    private String content; // 内容摘要
    private String source; // 来源
    private String sentiment; // 情感
    private Date createdAt; // 创建时间
}

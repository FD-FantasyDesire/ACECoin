package com.ruoyi.acecoin.domain.vo;

import lombok.Data;

import java.util.Date;


@Data
public class MessagesVo {

    private Integer id;

    private String coinId;

    private String title;

    private String content;

    private String source;

    private String sentiment;

    private Date createdAt; // 输出时带创建时间
}

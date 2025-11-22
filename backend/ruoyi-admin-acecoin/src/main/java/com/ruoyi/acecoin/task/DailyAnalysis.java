package com.ruoyi.acecoin.task;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DailyAnalysis {
//    TODO::待Dify数据抓取实现
    @Scheduled(cron = "0 0 8 * * ?")
    public void run() {
        System.out.println("每天 8 点的定时任务执行啦！");
    }
}

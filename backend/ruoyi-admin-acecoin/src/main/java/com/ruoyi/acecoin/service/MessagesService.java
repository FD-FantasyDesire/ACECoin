package com.ruoyi.acecoin.service;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.ruoyi.acecoin.domain.bo.MessagesBo;
import com.ruoyi.acecoin.domain.entity.Messages;
import com.ruoyi.acecoin.domain.vo.MessagesVo;
import com.ruoyi.acecoin.mapper.MessagesMapper;
import com.ruoyi.common.core.utils.MapstructUtils;
import com.ruoyi.common.mybatis.core.page.PageQuery;
import com.ruoyi.common.mybatis.core.page.TableDataInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Log4j2
public class MessagesService {

    private final MessagesMapper messagesMapper;

    /**
     * 查询详情
     */
    public MessagesVo queryById(Integer id) {
        return messagesMapper.selectVoById(id);
    }

    /**
     * 分页查询
     */
    public TableDataInfo<MessagesVo> queryPageList(MessagesBo bo, PageQuery pageQuery) {
        LambdaQueryWrapper<Messages> lqw = buildQueryWrapper(bo);
        Page<MessagesVo> result = messagesMapper.selectVoPage(pageQuery.build(), lqw);
        return TableDataInfo.build(result);
    }

    /**
     * 列表查询
     */
    public List<MessagesVo> queryList(MessagesBo bo) {
        LambdaQueryWrapper<Messages> lqw = buildQueryWrapper(bo);
        return messagesMapper.selectVoList(lqw);
    }

    /**
     * 构建查询条件
     */
    private LambdaQueryWrapper<Messages> buildQueryWrapper(MessagesBo bo) {
        LambdaQueryWrapper<Messages> lqw = Wrappers.lambdaQuery();
        lqw.like(StrUtil.isNotBlank(bo.getTitle()), Messages::getTitle, bo.getTitle());
        lqw.like(StrUtil.isNotBlank(bo.getContent()), Messages::getContent, bo.getContent());
        lqw.eq(StrUtil.isNotBlank(bo.getCoinId()), Messages::getCoinId, bo.getCoinId());
        lqw.eq(StrUtil.isNotBlank(bo.getSentiment()), Messages::getSentiment, bo.getSentiment());
        return lqw;
    }

    /**
     * 新增
     */
    @Transactional
    public void insertByForm(MessagesBo bo) {
        Messages entity = MapstructUtils.convert(bo, Messages.class);
        messagesMapper.insert(entity);
    }

    /**
     * 修改
     */
    @Transactional
    public void updateByForm(MessagesBo bo) {
        messagesMapper.updateById(MapstructUtils.convert(bo, Messages.class));
    }

    /**
     * 删除
     */
    @Transactional
    public void deleteById(Integer id) {
        messagesMapper.deleteById(id);
    }
}

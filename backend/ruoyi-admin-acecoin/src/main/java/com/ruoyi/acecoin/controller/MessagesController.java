package com.ruoyi.acecoin.controller;

import cn.dev33.satoken.annotation.SaIgnore;
import com.ruoyi.acecoin.domain.bo.MessagesBo;
import com.ruoyi.acecoin.domain.vo.MessagesVo;
import com.ruoyi.acecoin.service.MessagesService;
import com.ruoyi.common.core.domain.R;
import com.ruoyi.common.core.validate.AddGroup;
import com.ruoyi.common.core.validate.EditGroup;
import com.ruoyi.common.excel.utils.ExcelUtil;
import com.ruoyi.common.idempotent.annotation.RepeatSubmit;
import com.ruoyi.common.log.annotation.Log;
import com.ruoyi.common.log.enums.BusinessType;
import com.ruoyi.common.mybatis.core.page.PageQuery;
import com.ruoyi.common.mybatis.core.page.TableDataInfo;
import com.ruoyi.common.web.core.BaseController;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/messages")
@SaIgnore
public class MessagesController extends BaseController {

    private final MessagesService messagesService;

    /**
     * 查询消息列表（分页）
     */
    @GetMapping("/list")
    public TableDataInfo<MessagesVo> list(MessagesBo bo, PageQuery pageQuery) {
        return messagesService.queryPageList(bo, pageQuery);
    }

    /**
     * 查询消息列表（不分页）
     */
    @GetMapping("/listNoPage")
    public R<List<MessagesVo>> listNoPage(MessagesBo bo) {
        return R.ok(messagesService.queryList(bo));
    }

    /**
     * 导出消息
     */
    @Log(title = "消息", businessType = BusinessType.EXPORT)
    @PostMapping("/export")


    //    @SaCheckPermission("messages:export")
    public void export(MessagesBo bo, HttpServletResponse response) {
        List<MessagesVo> list = messagesService.queryList(bo);
        ExcelUtil.exportExcel(list, "消息", MessagesVo.class, response);
    }


    /**
     * 获取消息详细信息
     */
    @GetMapping("/{id}")
    public R<MessagesVo> getInfo(@NotNull(message = "主键不能为空") @PathVariable Integer id) {
        return R.ok(messagesService.queryById(id));
    }

    /**
     * 新增消息
     */
    @Log(title = "消息", businessType = BusinessType.INSERT)
    @RepeatSubmit
    @PostMapping()
    public R<Void> add(@Validated(AddGroup.class) @RequestBody MessagesBo form) {
        messagesService.insertByForm(form);
        return R.ok();
    }

    /**
     * 修改消息
     */
    @Log(title = "消息", businessType = BusinessType.UPDATE)
    @RepeatSubmit
    @PutMapping()
    public R<Void> edit(@Validated(EditGroup.class) @RequestBody MessagesBo form) {
        messagesService.updateByForm(form);
        return R.ok();
    }

    /**
     * 删除消息
     */
    @Log(title = "消息", businessType = BusinessType.DELETE)
    @DeleteMapping("/{id}")
    public R<Void> remove(@NotNull(message = "主键不能为空") @PathVariable Integer id) {
        messagesService.deleteById(id);
        return R.ok();
    }
}

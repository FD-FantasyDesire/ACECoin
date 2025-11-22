package com.ruoyi.acecoin.domain.bo;

import com.ruoyi.acecoin.domain.entity.Messages;
import com.ruoyi.common.core.validate.AddGroup;
import com.ruoyi.common.core.validate.EditGroup;
import io.github.linpeilie.annotations.AutoMapper;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@AutoMapper(target = Messages.class, reverseConvertGenerate = false)
public class MessagesBo {

    @NotNull(message = "消息ID不能为空", groups = { EditGroup.class })
    private Integer id;

    @NotBlank(message = "币种不能为空", groups = { AddGroup.class, EditGroup.class })
    private String coinId;

    @NotBlank(message = "消息标题不能为空", groups = { AddGroup.class, EditGroup.class })
    private String title;

    @NotBlank(message = "消息内容不能为空", groups = { AddGroup.class, EditGroup.class })
    private String content;

    private String source;

    private String sentiment;
}

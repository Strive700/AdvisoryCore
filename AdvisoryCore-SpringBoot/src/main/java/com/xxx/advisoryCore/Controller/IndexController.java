package com.xxx.advisoryCore.Controller;

import com.xxx.advisoryCore.Entity.IndexDefinition;
import com.xxx.advisoryCore.Entity.IndexTreeNode;
import com.xxx.advisoryCore.Service.IndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/index")
public class IndexController {

    @Autowired
    private IndexService indexService;

    /**
     * 获取全部大类资产指数（返回全部信息）
     */
    @GetMapping("/tree")
    public ResponseEntity<?> getIndexTree() {
        System.out.println("调用接口: getIndexTree()");
        try {
            List<IndexTreeNode> indexTreeNodes = indexService.getAllIndexTreeNodes();
            if (indexTreeNodes == null) {
                indexTreeNodes = Collections.emptyList();
            }
            return ResponseEntity.ok(indexTreeNodes);
        } catch (Exception e) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", "Failed to get index tree");
            errorBody.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
        }
    }

    /**
     * 根据指数名称查询指数定义信息
     * @param name 路径参数，指数名称
     * @return 指数定义实体或错误信息
     */
    @GetMapping("/definition-by-name/{name}")
    public ResponseEntity<?> getIndexDefinitionByName(@PathVariable String name) {
        System.out.println("调用接口: getIndexDefinitionByName(), name=" + name);
        try {
            IndexDefinition definition = indexService.getIndexDefinitionByName(name);
            if (definition != null) {
                return ResponseEntity.ok(definition);
            } else {
                Map<String, Object> errorBody = new HashMap<>();
                errorBody.put("error", "Not found");
                errorBody.put("message", "未找到对应的指数定义信息");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorBody);
            }
        } catch (Exception e) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", "Failed to get index definition");
            errorBody.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
        }
    }

    /**
     * 根据指数名称更新指数定义信息
     * @param name 路径参数，指数名称
     * @param indexDefinition 指数定义对象（JSON，需包含要更新的字段）
     * @return 更新结果
     */
    @PutMapping("/definition-by-name/{name}")
    public ResponseEntity<?> updateIndexDefinitionByName(@PathVariable String name, @RequestBody IndexDefinition indexDefinition) {
        System.out.println("调用接口: updateIndexDefinitionByName(), name=" + name + ", body=" + indexDefinition);
        try {
            indexDefinition.setName(name); // 用路径参数覆盖
            int result = indexService.updateIndexDefinitionByName(indexDefinition);
            if (result > 0) {
                return ResponseEntity.ok("更新成功");
            } else {
                Map<String, Object> errorBody = new HashMap<>();
                errorBody.put("error", "Update failed");
                errorBody.put("message", "未更新任何数据");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorBody);
            }
        } catch (Exception e) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", "Failed to update index definition");
            errorBody.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
        }
    }

    /**
     * 获取全部大类指数定义信息
     */
    @GetMapping("/definitions")
    public ResponseEntity<?> getAllIndexDefinitions() {
        System.out.println("调用接口: getAllIndexDefinitions()");
        try {
            List<IndexDefinition> definitions = indexService.getAllIndexDefinitions();
            return ResponseEntity.ok(definitions);
        } catch (Exception e) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", "Failed to get index definitions");
            errorBody.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
        }
    }

    /**
     * 新增大类指数定义信息
     */
    @PostMapping("/definition")
    public ResponseEntity<?> createIndexDefinition(@RequestBody IndexDefinition indexDefinition) {
        System.out.println("调用接口: createIndexDefinition(), body=" + indexDefinition);
        try {
            System.out.println("收到新增指数定义请求: " + indexDefinition);
            int result = indexService.insertIndexDefinition(indexDefinition);
            if (result > 0) {
                return ResponseEntity.status(HttpStatus.CREATED).body("创建成功");
            } else {
                Map<String, Object> errorBody = new HashMap<>();
                errorBody.put("error", "Create failed");
                errorBody.put("message", "未插入任何数据");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorBody);
            }
        } catch (Exception e) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", "Failed to create index definition");
            errorBody.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
        }
    }
}
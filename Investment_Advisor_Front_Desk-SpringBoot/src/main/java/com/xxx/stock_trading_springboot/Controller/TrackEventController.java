package com.xxx.stock_trading_springboot.Controller;

import com.xxx.stock_trading_springboot.Bean.TrackEvent;
import com.xxx.stock_trading_springboot.Service.TrackEventService;
import com.xxx.stock_trading_springboot.Util.SparkXfHelper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/track")
public class TrackEventController {
    @Autowired
    private TrackEventService trackEventService;

    @PostMapping("/event")
    public String receiveTrackEvent(@RequestBody TrackEvent event) {
        System.out.println(event);
        int result = trackEventService.insertTrackEvent(event);
        if (result > 0) {
            return "success";
        } else {
            return "fail";
        }
    }

    // 根据 user_id 查询事件列表
    @GetMapping("/events/user/{user_id}")
    public List<TrackEvent> getEventsByUserId(@PathVariable("user_id") String user_id) {
        return trackEventService.getTrackEventsByUserId(user_id);
    }

    // 查询所有事件
    @GetMapping("/events")
    public List<TrackEvent> getAllEvents() {
        return trackEventService.getAllTrackEvents();
    }

    // 实时统计接口
    @GetMapping("/event/active-users")
    public int getActiveUsers(@RequestParam(defaultValue = "5") int minutes) {
        return trackEventService.countActiveUsers(minutes);
    }

    @GetMapping("/event/count")
    public int getEventCount(@RequestParam(defaultValue = "5") int minutes) {
        return trackEventService.countEvents(minutes);
    }

    @GetMapping("/event/active-pages")
    public List<String> getActivePages(@RequestParam(defaultValue = "5") int minutes) {
        System.out.println("<UNK>5<UNK>");
        return trackEventService.getActivePages(minutes);
    }

    @GetMapping("/event/active-modules")
    public List<String> getActiveModules(@RequestParam(defaultValue = "5") int minutes) {
        return trackEventService.getActiveModules(minutes);
    }

    // 获取最近N分钟每分钟的活跃用户数趋势
    @GetMapping("/event/active-users-trend")
    public List<com.xxx.stock_trading_springboot.Bean.TrendPoint> getActiveUsersTrend(@RequestParam(defaultValue = "10") int minutes) {
        return trackEventService.getActiveUsersTrend(minutes);
    }

    // 获取最近N分钟每分钟的事件数趋势
    @GetMapping("/event/event-count-trend")
    public List<com.xxx.stock_trading_springboot.Bean.TrendPoint> getEventCountTrend(@RequestParam(defaultValue = "10") int minutes) {
        return trackEventService.getEventCountTrend(minutes);
    }

    // 根据user_id查询该用户所有埋点事件
    @GetMapping("/event/user-events")
    public List<TrackEvent> getUserEvents(@RequestParam String user_id) {
        return trackEventService.getUserEvents(user_id);
    }

    // AI生成用户画像接口
    @PostMapping("/ai/generate-profile")
    public String generateUserProfile(@RequestBody Map<String, Object> body) {
        System.out.println("<UNK>5<UNK>");
        String userId = (String) body.get("user_id");
        List<TrackEvent> events = trackEventService.getUserEvents(userId);
        StringBuilder sb = new StringBuilder();
        sb.append("请根据以下用户行为事件，生成该用户的简要画像，输出格式必须为严格的JSON对象，字段包括：\n");
        sb.append("{\n");
        sb.append("  \"兴趣\": \"简要描述\",\n");
        sb.append("  \"活跃度\": \"简要描述\",\n");
        sb.append("  \"偏好\": \"简要描述\",\n");
        sb.append("  \"标签\": [\"标签1\", \"标签2\"],\n");
        sb.append("  \"雷达\": {\n");
        sb.append("    \"活跃度\": 0-100,\n");
        sb.append("    \"多样性\": 0-100,\n");
        sb.append("    \"交易频率\": 0-100,\n");
        sb.append("    \"基金关注\": 0-100,\n");
        sb.append("    \"股票关注\": 0-100\n");
        sb.append("  }\n");
        sb.append("}\n");
        sb.append("请严格只输出上述JSON对象，不要输出任何解释、注释或自然语言，否则会导致解析失败。行为事件如下：\n");
        for (TrackEvent e : events) {
            sb.append(String.format("页面:%s, 操作:%s, 模块:%s;\n",
                e.getPage_name(), e.getEvent_name(), e.getModule()));
        }
        sb.append("请用简洁的中文填写各字段内容，雷达各项分数为0-100的整数。\n");
        String prompt = sb.toString();
        try {
            String sparkResult = SparkXfHelper.callSparkX1(prompt);
            System.out.println("[SparkX1原始返回] " + sparkResult); // 调试用
            // 自动提取首个合法 JSON
            String json = sparkResult.trim();
            if (!json.startsWith("{")) {
                int start = json.indexOf("{");
                int end = json.lastIndexOf("}");
                if (start >= 0 && end > start) {
                    json = json.substring(start, end + 1);
                }
            }
            return json;
        } catch (Exception ex) {
            ex.printStackTrace();
            return "调用讯飞星火大模型失败: " + ex.getMessage();
        }
    }
} 
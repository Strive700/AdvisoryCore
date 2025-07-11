package com.xxx.stock_trading_springboot.Bean;

import java.util.Map;

public class TrackEventDTO {
    private Long id;
    private String event_id;
    private String event_name;
    private String module;
    private String page_name;
    private String trigger_type;
    private String target_component;
    private String selector;
    private Map<String, Object> extra_params;
    private String priority;
    private String user_id;
    private String user_name;
    private String user_email;
    private String user_phone;
    private String user_address;
    private String user_city;
    private String user_state;
    private String created_at;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEvent_id() { return event_id; }
    public void setEvent_id(String event_id) { this.event_id = event_id; }
    public String getEvent_name() { return event_name; }
    public void setEvent_name(String event_name) { this.event_name = event_name; }
    public String getModule() { return module; }
    public void setModule(String module) { this.module = module; }
    public String getPage_name() { return page_name; }
    public void setPage_name(String page_name) { this.page_name = page_name; }
    public String getTrigger_type() { return trigger_type; }
    public void setTrigger_type(String trigger_type) { this.trigger_type = trigger_type; }
    public String getTarget_component() { return target_component; }
    public void setTarget_component(String target_component) { this.target_component = target_component; }
    public String getSelector() { return selector; }
    public void setSelector(String selector) { this.selector = selector; }
    public Map<String, Object> getExtra_params() { return extra_params; }
    public void setExtra_params(Map<String, Object> extra_params) { this.extra_params = extra_params; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public String getUser_id() { return user_id; }
    public void setUser_id(String user_id) { this.user_id = user_id; }
    public String getUser_name() { return user_name; }
    public void setUser_name(String user_name) { this.user_name = user_name; }
    public String getUser_email() { return user_email; }
    public void setUser_email(String user_email) { this.user_email = user_email; }
    public String getUser_phone() { return user_phone; }
    public void setUser_phone(String user_phone) { this.user_phone = user_phone; }
    public String getUser_address() { return user_address; }
    public void setUser_address(String user_address) { this.user_address = user_address; }
    public String getUser_city() { return user_city; }
    public void setUser_city(String user_city) { this.user_city = user_city; }
    public String getUser_state() { return user_state; }
    public void setUser_state(String user_state) { this.user_state = user_state; }
    public String getCreated_at() { return created_at; }
    public void setCreated_at(String created_at) { this.created_at = created_at; }
} 
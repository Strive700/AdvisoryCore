package com.xxx.stock_trading_springboot.Util;

import okhttp3.*;
import okio.ByteString;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.net.URLEncoder;
import java.util.Base64;
import org.json.JSONObject;
import org.json.JSONArray;

public class SparkXfHelper {
    // 讯飞星火 WebSocket 鉴权参数
    public static final String APPID = "4aff09d9";
    public static final String API_KEY = "246d95a087730a1e7c921723462db875";
    public static final String API_SECRET = "MzBiYmEyYzA0MDYzZjE2MjE1Nzk1MDMz";
    public static final String HOST = "spark-api.xf-yun.com";
    public static final String WS_URL = "wss://spark-api.xf-yun.com/v1/x1";

    // 生成 GMT 格式时间
    private static String getGMTDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss z", Locale.US);
        sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
        return sdf.format(new Date());
    }

    // HMAC-SHA256 签名
    private static String hmacSha256(String data, String key) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        mac.init(secretKeySpec);
        byte[] hash = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(hash);
    }

    // 构造带鉴权的 ws url
    private static String buildAuthUrl() throws Exception {
        String date = getGMTDate();
        String requestLine = "GET /v1/x1 HTTP/1.1";
        String signatureOrigin = "host: " + HOST + "\n" +
                "date: " + date + "\n" +
                requestLine;
        String signature = hmacSha256(signatureOrigin, API_SECRET);
        String authorizationOrigin = String.format(
                "api_key=\"%s\", algorithm=\"hmac-sha256\", headers=\"host date request-line\", signature=\"%s\"",
                API_KEY, signature);
        String authorization = Base64.getEncoder().encodeToString(authorizationOrigin.getBytes(StandardCharsets.UTF_8));
        String url = WS_URL + "?authorization=" + URLEncoder.encode(authorization, "UTF-8") +
                "&date=" + URLEncoder.encode(date, "UTF-8") +
                "&host=" + URLEncoder.encode(HOST, "UTF-8");
        return url;
    }

    // 发送 WebSocket 请求，获取 AI 画像
    public static String callSparkX1(String prompt) throws Exception {
        String wsUrl = buildAuthUrl();
        OkHttpClient client = new OkHttpClient.Builder().readTimeout(30, TimeUnit.SECONDS).build();
        CountDownLatch latch = new CountDownLatch(1);
        final StringBuilder aiResult = new StringBuilder();
        final StringBuilder userProfile = new StringBuilder();
        Request request = new Request.Builder().url(wsUrl).build();
        WebSocketListener listener = new WebSocketListener() {
            @Override
            public void onOpen(WebSocket webSocket, Response response) {
                // 构造请求体，修正 prompt 特殊字符转义
                String safePrompt = prompt
                        .replace("\\", "\\\\") // 先转义反斜杠
                        .replace("\"", "\\\"") // 再转义引号
                        .replace("\n", "\\n")    // 转义换行
                        .replace("\r", "");        // 去掉回车
                String json = "{" +
                        "\"header\": {\"app_id\": \"" + APPID + "\", \"uid\": \"user_001\"}," +
                        "\"parameter\": {\"chat\": {\"domain\": \"x1\", \"temperature\": 0.5, \"max_tokens\": 2048}}," +
                        "\"payload\": {\"message\": {\"text\": [{\"role\": \"user\", \"content\": \"" + safePrompt + "\"}]}}" +
                        "}";
                webSocket.send(json);
            }
            @Override
            public void onMessage(WebSocket webSocket, String text) {
                // 解析返回内容，拼接AI回复
                aiResult.append(text).append("\n");
                try {
                    JSONObject obj = new JSONObject(text);
                    if (obj.has("payload")) {
                        JSONObject payload = obj.getJSONObject("payload");
                        if (payload.has("choices")) {
                            JSONObject choices = payload.getJSONObject("choices");
                            if (choices.has("text")) {
                                JSONArray textArr = choices.getJSONArray("text");
                                for (int i = 0; i < textArr.length(); i++) {
                                    JSONObject txtObj = textArr.getJSONObject(i);
                                    String content = txtObj.optString("reasoning_content", txtObj.optString("content", ""));
                                    userProfile.append(content);
                                }
                            }
                        }
                    }
                } catch (Exception e) {
                    // 忽略解析异常，保留原始内容
                }
                // 讯飞星火返回的 JSON 里，is_end=1 表示结束
                if (text.contains("\"is_end\":1")) {
                    webSocket.close(1000, null);
                    latch.countDown();
                }
            }
            @Override
            public void onMessage(WebSocket webSocket, ByteString bytes) {
                onMessage(webSocket, bytes.utf8());
            }
            @Override
            public void onFailure(WebSocket webSocket, Throwable t, Response response) {
                aiResult.append("[ERROR] ").append(t.getMessage());
                latch.countDown();
            }
            @Override
            public void onClosed(WebSocket webSocket, int code, String reason) {
                latch.countDown();
            }
        };
        client.newWebSocket(request, listener);
        latch.await(30, TimeUnit.SECONDS);
        // 返回拼接后的用户画像文本
        return userProfile.length() > 0 ? userProfile.toString() : aiResult.toString();
    }
} 
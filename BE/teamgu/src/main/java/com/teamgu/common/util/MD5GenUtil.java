package com.teamgu.common.util;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Component
@NoArgsConstructor
/**
 * MD5 알고리즘을 이용하여 파일명 암호화 클래스
 */
public class MD5GenUtil {

    private String result;

    public MD5GenUtil(String input) throws NoSuchAlgorithmException {
        MessageDigest mdMD5 = MessageDigest.getInstance("MD5");
        mdMD5.update(input.getBytes(StandardCharsets.UTF_8));
        byte[] md5Hash = mdMD5.digest();
        StringBuilder hexMD5hash = new StringBuilder();

        for (byte b : md5Hash) {
            String hexString = String.format("%02x", b);
            hexMD5hash.append(hexString);
        }

        result = hexMD5hash.toString();
    }

    public String toString() {
        return result;
    }
}

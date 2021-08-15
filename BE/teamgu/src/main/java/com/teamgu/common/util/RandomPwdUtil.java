package com.teamgu.common.util;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Date;

/**
 * 10자리의 임시 비밀번호를 생성하는 클래스
 *
 * Random 함수 말고 SecureRandom을 사용하는 이유는
 * 동일한 시간에 Random함수를 수행하게 되면 동일한 값을 리턴
 *
 * SecureRandom 내에 seed함수를 통해 강력한 난수 발생
 */
@Component
public class RandomPwdUtil {

    private final int size = 10;

    public String getRandomPwd() {

        char[] charSet = new char[]{
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                'u', 'v', 'w', 'x', 'y', 'z',
                '!', '@', '#', '$', '%', '^', '&'
        };

//        StringBuffer sb = new StringBuffer(); //Thread-safe를 위해서는 StringBuffer 사용 필요
        StringBuilder sb = new StringBuilder();
        SecureRandom sr = new SecureRandom();

        sr.setSeed(new Date().getTime());

        int idx = 0;
        int len = charSet.length;

        for(int i = 0; i < this.size; i++) {
            idx = sr.nextInt(len);
            sb.append(charSet[idx]);
        }

        return sb.toString();
    }
}

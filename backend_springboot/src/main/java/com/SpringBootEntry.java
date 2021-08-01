package com;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author: jane
 * @CreateTime: 2020/5/14
 * @Description:
 */
@SpringBootApplication(scanBasePackages = "com")
//@MapperScan(basePackages = "com.dao")
public class SpringBootEntry {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootEntry.class, args);
    }
}

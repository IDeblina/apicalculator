package com.iqac;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.iqac")
public class IqacCalculatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(IqacCalculatorApplication.class, args);
	}

}

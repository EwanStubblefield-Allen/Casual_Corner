package com.Casual_Corner;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.client.RestTemplate;

import com.Casual_Corner.Models.Account;

@Configuration
public class SecurityConfig {
  private final Environment env;

  public SecurityConfig(Environment env) {
    this.env = env;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .authorizeHttpRequests((authorize) -> authorize
            .requestMatchers("/account/**").authenticated()
            .requestMatchers(HttpMethod.GET).permitAll()
            .requestMatchers(HttpMethod.POST).authenticated()
            .requestMatchers(HttpMethod.PUT).authenticated()
            .requestMatchers(HttpMethod.DELETE).authenticated())
        .cors(Customizer.withDefaults())
        .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
        .build();
  }

  public Account getUserInfo(String token) {
    String url = env.getProperty("okta.oauth2.issuer") + "userinfo";

    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", token);
    HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<Account> response = restTemplate.exchange(url, HttpMethod.GET, entity, Account.class);

    return response.getBody();
  }
}

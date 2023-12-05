package com.Casual_Corner;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
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
}

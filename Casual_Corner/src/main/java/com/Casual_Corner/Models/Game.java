package com.Casual_Corner.Models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "games")
public class Game {
  @Id
  private String id;
  @Column(nullable = false)
  private String name;
  @Column(nullable = false)
  private Date released;
  @Column(nullable = false)
  private String background_image;
  @Column(nullable = false)
  private Integer metacritic;
  @Column(nullable = false)
  private Integer playtime;
  @Column(nullable = false, columnDefinition = "BLOB")
  private String platforms;
  @Column(nullable = false, columnDefinition = "BLOB")
  private String genres;
  private String esrb_rating;
}

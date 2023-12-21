package com.Casual_Corner.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;
  @Column(nullable = false)
  private Integer apiId;
  @Column(nullable = false)
  private String name;
  @Column(nullable = false)
  private String background_image;
  @Column(nullable = false)
  private Integer metacritic;
  @Column(nullable = false)
  private String creatorId;
  @ManyToOne
  @JoinColumn(name = "creatorId", insertable = false, updatable = false)
  private Account creator;
}

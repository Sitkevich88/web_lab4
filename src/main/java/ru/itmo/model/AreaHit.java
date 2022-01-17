package ru.itmo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="areaHit")
public class AreaHit {
    @Id
    @GeneratedValue
    private Long id;
    private Double x;
    private Double y;
    private Double r;
    private Boolean res;
    @ManyToOne
    @JoinColumn(name = "user_ID", nullable = false, updatable = false)
    private User user;
}


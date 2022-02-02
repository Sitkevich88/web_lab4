package ru.itmo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PointRequest {
    private Double x;
    private Double y;
    private Double r;
}

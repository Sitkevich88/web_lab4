package ru.itmo.web_objects;

import lombok.Getter;
import lombok.Setter;

public class PointResponse extends PointRequest {
    @Getter @Setter
    private Boolean result;

    public PointResponse(Double x, Double y, Double r, Boolean result){
        super(x, y, r);
        this.result = result;
    }
}

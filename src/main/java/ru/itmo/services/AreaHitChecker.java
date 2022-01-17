package ru.itmo.services;

import org.springframework.stereotype.Service;
import ru.itmo.model.AreaHit;
import ru.itmo.web_objects.PointRequest;
import ru.itmo.web_objects.PointResponse;

@Service
public class AreaHitChecker {

    public void setIfHit(AreaHit obj){
        if (obj==null){return;}
        boolean result = false;
        try{
            double x = obj.getX();
            double y = obj.getY();
            double r = obj.getR();
            result = isHit(x, y, r);
        }finally {
            obj.setRes(result);
        }
    }

    public PointResponse getResponse(PointRequest obj){
        if (obj==null){return null;}
        PointResponse response = new PointResponse(obj.getX(), obj.getY(), obj.getR(), false);
        boolean result = false;
        try{
            double x = obj.getX();
            double y = obj.getY();
            double r = obj.getR();
            result = isHit(x, y, r);
        }finally {
            response.setResult(result);
        }
        return response;
    }

    private boolean isHit(double x, double y, double r){
        boolean result = false;
        try{
            int quadrant = detectQuadrant(x, y);
            final boolean inQuarter = x * x + y * y <= r * r;
            switch (quadrant){
                case 1:
                    if(r>=0){
                        if(inQuarter){
                            result = true;
                        }
                    }
                    break;
                case 2:
                    if(r<0){
                        if(inQuarter){
                            result = true;
                        }
                    }
                    break;
                case 3:
                    if(r>=0){
                        if(x>-r && y>(-r/2.0)){
                            result = true;
                        }
                    } else{
                        r = -r;
                        if(x>-r && y>((x+r)/-2.0)){
                            result = true;
                        }
                    }
                    break;
                case 4:
                    if(r>=0){
                        if(x<r && y>((x-r)/2.0)){
                            result = true;
                        }
                    } else{
                        r = -r;
                        if(x<r && y>(-r/2.0)){
                            result = true;
                        }
                    }
                    break;
                default:
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return result;
    }

    private int detectQuadrant(double x, double y){
        int res;
        if (x>=0){
            if (y>=0){
                res = 1;
            }else{
                res = 4;
            }
        }else{
            if (y>=0){
                res = 2;
            }else{
                res = 3;
            }
        }
        return res;
    }
}

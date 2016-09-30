package com.interview.classes;

import java.util.HashMap;

/**
 * Created by coon on 12.05.2016.
 */
public class LimitedHashMap extends HashMap {
    private static Integer DEFAULT_MAX_SIZE = 16;
    private Integer size = DEFAULT_MAX_SIZE;

    private LimitedHashMap(){}

    public LimitedHashMap(Integer size) {
        super(size);
        this.size = size;
    }

}

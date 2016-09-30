package com.interview.interfaces;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

/**
 * Created by coon on 11.05.2016.
 */
public class FrequencyMonitor<K> implements CacheMonitor<K> {
    Map<K, Integer> freqMap = new HashMap<>();


    @Override
    public void register(K key) {
        freqMap.put(key, Integer.valueOf(0));
    }

    @Override

    public void reset() {
        freqMap.clear();
    }

    @Override
    public void call(K key) {
        Integer frequency = 0;
        if (freqMap.containsKey(key)) {
            frequency = freqMap.get(key);
            frequency++;
        } else {
            freqMap.put(key, ++frequency);
        }
    }



}


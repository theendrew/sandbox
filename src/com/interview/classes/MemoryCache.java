package com.interview.classes;

import com.interview.interfaces.Cache;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by coon on 10.05.2016.
 */
public class MemoryCache<K,V> implements Cache<K,V> {

    private Map<K,V> innerMap = new HashMap<K, V>();

    @Override
    public void put(K key, V value) {
        innerMap.put(key, value);
    }

    @Override
    public V get(K key) {
        return innerMap.get(key);
    }

    @Override
    public void clear() {
        innerMap.clear();
    }

    @Override
    public Integer size() {
        return innerMap.size();
    }

    @Override
    public void setMaxSize(int maxSize) {

    }

    @Override
    public int getMaxSize() {
        return 0;
    }

}

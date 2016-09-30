package com.interview.interfaces;

/**
 * Created by coon on 10.05.2016.
 */
public interface Cache<K, V> {
    void put(K key, V value);
    V get(K key);
    void clear();
    Integer size();
    void setMaxSize(int maxSize);
    int getMaxSize();

}

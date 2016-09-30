package com.interview.classes;

import com.interview.interfaces.Cache;

import java.io.File;

/**
 * Created by coon on 11.05.2016.
 */
public class FileCache<K,V> implements Cache<K,V> {
    private File fileCache  = new File("fileCache");

    @Override
    public void put(K key, V value) {

    }

    @Override
    public V get(K key) {
        return null;
    }

    @Override
    public void clear() {

    }

    @Override
    public Integer size() {
        return 0;
    }

    @Override
    public void setMaxSize(int maxSize) {

    }

    @Override
    public int getMaxSize() {
        return 0;
    }
}

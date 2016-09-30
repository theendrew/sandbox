package com.interview.classes;

import com.interview.interfaces.Cache;
import com.interview.interfaces.CacheMonitor;

/**
 * Created by coon on 31.05.2016.
 */
public class CacheWrapper<K,V> implements Cache<K, V> {

    private Cache<K,V> wrappedCache;
    private CacheMonitor monitor;

    public CacheWrapper(CacheMonitor monitor, Cache cache) {
        this.monitor = monitor;
        this.wrappedCache = cache;
    }

    @Override
    public void put(K key, V value) {
        monitor.call(key);
        wrappedCache.put(key, value);
    }

    @Override
    public V get(K key) {
        //monitor.call();
        return wrappedCache.get(key);
    }

    @Override
    public void clear() {
        wrappedCache.clear();
        monitor.reset();
    }

    @Override
    public Integer size() {
        return wrappedCache.size();
    }

    @Override
    public void setMaxSize(int maxSize) {

    }

    @Override
    public int getMaxSize() {
        return 0;
    }
}

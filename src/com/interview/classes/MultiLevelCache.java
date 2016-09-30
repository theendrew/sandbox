package com.interview.classes;

import com.interview.interfaces.Cache;
import com.interview.interfaces.CacheStrategy;

import java.util.List;

/**
 * Created by coon on 11.05.2016.
 */
public class MultiLevelCache<K,V> implements Cache<K,V> {
    private List<Cache> caches;
    private CacheStrategy strategy;

    public MultiLevelCache(List<Cache> caches) {
        this.caches = caches;
    }

    @Override
    public void put(K key, V value) {
        recache();
    }

    @Override
    public V get(K key) {
        recache();
        return null;
    }

    @Override
    public void clear() {
        for (Cache cache : caches) {
            cache.clear();
        }
    }

    @Override
    public Integer size() {
        Integer totalSize = 0;
        for (Cache cache : caches) {
            totalSize += cache.size();
        };
        return totalSize;
    }

    @Override
    public void setMaxSize(int maxSize) {

    }

    @Override
    public int getMaxSize() {
        return 0;
    }

    // redistribute items in MultiLevelCache
    void recache() {
        //strategy.recache();
    }

    /**
     *
     * */
//    public Cache asCache() {
//        Cache totalCache = new MemoryCache();
//        for (Cache  cache : caches) {
//           // totalCache.put();
//        }
//    }

    public List<Cache> getCaches() {
        return caches;
    }

    public void setCaches(List<Cache> caches) {
        this.caches = caches;
    }

    public CacheStrategy getStrategy() {
        return strategy;
    }

    public void setStrategy(CacheStrategy strategy) {
        this.strategy = strategy;
    }

}

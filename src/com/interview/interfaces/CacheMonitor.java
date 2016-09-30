package com.interview.interfaces;

/**
 * Created by coon on 31.05.2016.
 */
public interface CacheMonitor<K> {
    /*
    * Call monitor when cache item affected**/
    void register(K key);
    void call(K key);
    void reset();


}

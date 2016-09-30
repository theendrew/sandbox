package com.interview;

import com.interview.classes.MultiLevelCache;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
//&quot;Create a configurable two-level cache (for caching Objects).  Level 1 is memory,
//
//        level 2 is filesystem. Config params should let one specify the cache strategies
//
//        and max sizes of level  1 and 2.&quot;
public class Main {
    Object a = "string";


    public static void main(String[] args) {
        Main app = new Main();
        int x=1;
        while (true) {
            if (compare(int2intarr(2*x),int2intarr(6*x))) {
                break;
            }
            x++;
        }
        System.out.println("x = " + x + " 2*x = " + 2*x +" 6*x = " + 6*x); //5175

    }

    static boolean task(int a, int b){
        System.out.println("a = " + a + ", b = " +b);
        return  compare(int2intarr(a),int2intarr(b));

    }

    static int[] int2intarr(int toarr) {
       int[] arr = new int[length(toarr)];
        int i=0;
        while (toarr != 0) {
            arr[i++] = toarr % 10;
            toarr /= 10;
        }
        //System.out.println(Arrays.toString(arr));

        Arrays.sort(arr);
        //System.out.println(Arrays.toString(arr));

        return arr;
    }

    static boolean compare(int[]a, int b[]){
        int min = a.length < b.length ? a.length : b.length;
        for (int i=0;i<min;i++) {
            if( a[i] != b[i]) return false;
        }
        return a.length == b.length;
    }

    static  void task2() {
        int counter=0;
        for (int i =1; i<13147; i++) {
            int testForPolyndrom = i;
            for (int j = 1; j <= 50; j++) {
                testForPolyndrom = testForPolyndrom + reverse(testForPolyndrom);
                if (isPolyndrom(testForPolyndrom)) {
                    counter++;
                    break;
                }
            }
        }
        System.out.println(13147 - counter);
    }



    private static int reverse(int toReverse){
        //System.out.print(toReverse + " ");
        int reversed = 0;
        while (toReverse > 0) {
            reversed = 10 * reversed + toReverse % 10;
            toReverse /= 10;
        }
        //System.out.println(reversed);

        return reversed;
    }

    static boolean isPolyndrom(int number) {
        int tmp= number;

        int left=0, reversed=0;
        for  (int i=0; i < length(number) / 2; i++) {
            reversed = 10 * reversed + tmp % 10;
            tmp /= 10;
        }
        if (length(number) % 2 != 0) {
            tmp /= 10;
        }
        return tmp == reversed;
    }
    static int length(int number) {
        int digits =0;
        while (number>0) {
            number /= 10;
            digits++;
        }
        return digits;
    }

    static void task3(){
        long start = System.currentTimeMillis();
        int counter = 0;
        for (int r = 1; r <= 9; r++) {
            for (int q = 0; q <= 9; q++) {
                for (int z = 1; z <= 9; z++) {
                    for (int w = 0; w <= 9; w++) {
                        for (int v = 0; v <= 9; v++) {
                            int add1 = Integer.valueOf("" + z + q + r);
                            int add2 = Integer.valueOf("" + z + v + v);
                            int sum = Integer.valueOf("" + r + q + v + w);

                            if (add1 + add2 == sum) {
                                ++counter;
                                System.out.println(add1 + " + " + add2+ " = "+ sum);
                            }

                        }
                    }
                }
            }
        }
        long execTimeSec = (System.currentTimeMillis() - start) / 1000L;
        System.out.println("Running time = " + execTimeSec + " s");
        System.out.println("counter = " + counter);
    }

    static void task4(int length) {
        if (length % 2 == 0) {
            System.out.println("Ñòîðîíà ñïèðàëè äîëæíà áûòü íå÷åòíîé");
        }
        int sum = 0;
        for (int n=3; n<=length; n+=2) {
            sum += 4*n*n - 6*(n-1);
        }
        sum += 1;
        System.out.println("Ñóììà íà äèàãîíàëÿõ = " + sum);
    }
}

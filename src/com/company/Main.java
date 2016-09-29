package com.company;

import java.io.FileInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Arrays;
import java.lang.Math.*;

public class Main {




    public static void main(String[] args) throws IOException{

        long[] arr = new long[(Math.pow(107, 141))];
        System.out.println(Math.pow(2, 32) -1);
        //task2();
//        task4(5);
//        task4(1);
//        task4(4546);
//        task4(1065);
    }

    /** Дано равенство, в котором цифры заменены на буквы:
     zty + zvv = ryzt

     Найдите сколько у него решений, если различным буквам соответствуют различные цифры (ведущих нулей в числе не бывает).
     */
    void task2(){
        long start = System.currentTimeMillis();
        int counter = 0;
        for (int r = 1; r <= 9; r++) {
            for (int z = 1; z <= 9; z++) {
                for (int t = 0; t <= 9; t++) {
                    for (int y = 0; y <= 9; y++) {
                        for (int v = 0; v <= 9; v++) {
                            int add1 = Integer.valueOf("" + z + t + y);
                            int add2 = Integer.valueOf("" + z + v + v);
                            int sum = Integer.valueOf("" + r + y + z + t);

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
            System.out.println("Сторона спирали должна быть нечетной");
        }
        int sum = 0;
        for (int n=3; n<=length; n+=2) {
            sum += 4*n*n - 6*(n-1);
        }
        sum += 1;
        System.out.println("Сумма на диагоналях = " + sum);
    }

}

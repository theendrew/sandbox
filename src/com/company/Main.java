package com.company;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.math.BigDecimal;
import java.util.Arrays;
import java.lang.Math.*;
import java.util.Stack;

public class Main {

    static final PrintStream OUT = System.out;


    public static void main(String[] args) throws IOException{

        //task2();
//        task4(5);
//        task4(1);
//        task4(4546);
//        task4(1065);
        String srt ="".substring(1);
        OUT.println(srt);
        OUT.println("(1) " + isBalancedString("(1) "));
        OUT.println("(1)( " + isBalancedString("(1)( "));
        OUT.println(")1) " + isBalancedString(")1) "));
        OUT.println("sadffdsfdsf)1) gffdhg((" + isBalancedString("sadffdsfdsf)1) gffdhg(("));
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


    static int pascal(int column, int row) {
        if (column == 0 || column == row) return 1;
        return pascal(column - 1, row - 1) + pascal(column, row - 1);
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

    static char popChar(String str) {
        char c = str.charAt(0);

        popChar(str.substring(1));return c;
    }

    static boolean isBalanced(String str) {
        if (str.length() == 1) return true;
        char c = str.charAt(0);
        if (c == '(') isBalanced(str.substring(1));
        return true;

    }
    static boolean isBalancedString(String toTest) {
        Stack<Character> chars = new Stack<Character>();
        for (int i =0; i < toTest.length() - 1; i++){
            char c= c=toTest.charAt(i);
            if (c == '(') {
                chars.push(c);
            }
            if (c==')') {
                if (chars.empty()) return false;
                chars.pop();
            }
        }

        return chars.empty();
    }

    static int[] int2PrimaryInts(int number) {

        if (number ==1) return new int[] {1};
        for (int i = 2;number ==0;) {
                if (number % i == 0) {
                    number /= i;
                }
    }




}

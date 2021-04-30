package kr.easw.dtmic.server.util;

import java.awt.Color;
import java.awt.image.BufferedImage;


public class ASCII {
    public static String convert(final BufferedImage image) {
        StringBuilder sb = new StringBuilder((image.getWidth() + 1) * image.getHeight());
        for (int y = 0; y < image.getHeight(); y++) {
            if (sb.length() != 0) sb.append("\n");
            for (int x = 0; x < image.getWidth(); x++) {
                Color pixelColor = new Color(image.getRGB(x, y));
                //double gValue = (double) pixelColor.getRed() * 0.2989 + (double) pixelColor.getBlue() * 0.5870 + (double) pixelColor.getGreen() * 0.1140;

                
                sb.append(image.getRGB(x, y) ==0 ? ' ' : '0');
            }
        }
        return sb.toString();
    }

    /**
     * Same method as above, except it reverses the darkness of the pixel. A dark pixel is given a light character and vice versa.
     *
     * @param g grayscale
     * @return char
     */
    private static char returnStrNeg(double g) {
        final char str;

        if (g >= 230.0) {
            str = '@';
        } else if (g >= 200.0) {
            str = '#';
        } else if (g >= 180.0) {
            str = '8';
        } else if (g >= 160.0) {
            str = '&';
        } else if (g >= 130.0) {
            str = 'o';
        } else if (g >= 100.0) {
            str = ':';
        } else if (g >= 70.0) {
            str = '*';
        } else if (g >= 1.0) {
            str = '.';
        } else {
            str = ' ';
        }
        return str;

    }
}
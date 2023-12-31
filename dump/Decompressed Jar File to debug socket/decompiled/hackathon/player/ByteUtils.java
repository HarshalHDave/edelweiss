/*
 * Decompiled with CFR 0.152.
 */
package hackathon.player;

public class ByteUtils {
    public static byte[] charsToSinglePaddedByteArray(char[] chars, int byteArraySize) {
        if (chars.length <= byteArraySize) {
            byte[] bytes = new byte[byteArraySize];
            for (int i = 0; i < byteArraySize; ++i) {
                bytes[i] = i < chars.length ? (byte)chars[i] : (byte)0;
            }
            return bytes;
        }
        throw new IllegalArgumentException("Chars Array Size is greater than max byte size");
    }

    public static String byteArrayToString(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            if (b == 0) break;
            sb.append((char)b);
        }
        return sb.toString();
    }
}


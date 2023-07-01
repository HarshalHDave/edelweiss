/*
 * Decompiled with CFR 0.152.
 */
package hackathon.player;

import java.io.IOException;
import java.util.function.Consumer;
import java.util.function.Function;

public interface DataReader<I, T> {
    public void start() throws IOException;

    public void registerReaderHandler(Function<I, T> var1);

    public void registerDataHandler(Consumer<T> var1);

    public void registerStopCallback(Consumer<Void> var1);
}


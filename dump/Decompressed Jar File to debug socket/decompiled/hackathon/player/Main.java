/*
 * Decompiled with CFR 0.152.
 */
package hackathon.player;

import hackathon.player.BufferedFileDataReaderImpl;
import hackathon.player.OutputController;
import hackathon.player.TCPControllerImpl;
import hackathon.player.model.MarketData;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    private final BlockingQueue<MarketData> queue = new ArrayBlockingQueue<MarketData>(8096);
    private final OutputController<MarketData> outputController;
    private volatile boolean keepRunning = true;

    public Main(int listeningPort, double speedUp) throws IOException {
        this.outputController = new TCPControllerImpl(listeningPort, Math.max(speedUp, 1.0));
        ExecutorService executorService = Executors.newSingleThreadExecutor();
        executorService.submit(() -> {
            try {
                while (this.keepRunning) {
                    MarketData md = this.queue.take();
                    this.outputController.receive(md);
                }
            }
            catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public static void main(String[] args) throws IOException {
        if (args.length != 2) {
            System.err.println("Usage java Main <inputFileName> <Port>");
            System.exit(1);
        }
        Main main = new Main(Integer.parseInt(args[1]), Double.parseDouble(System.getProperty("speed", "1.0")));
        Runtime.getRuntime().addShutdownHook(new Thread(main::stop));
        main.readFile(args[0]);
    }

    private void readFile(String inputFile) throws IOException {
        BufferedFileDataReaderImpl<MarketData> reader = new BufferedFileDataReaderImpl<MarketData>(inputFile);
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        reader.registerReaderHandler(s -> {
            String[] tuples = s.split(",");
            try {
                return new MarketData(tuples[0], Integer.parseInt(tuples[1]), Integer.parseInt(tuples[2]), Long.parseLong(tuples[3]), Integer.parseInt(tuples[4]), Integer.parseInt(tuples[5]), Integer.parseInt(tuples[6]), Integer.parseInt(tuples[7]), Long.parseLong(tuples[8]), sdf.parse(tuples[9]), Long.parseLong(tuples[10]), Long.parseLong(tuples[11]));
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        });
        reader.registerDataHandler(e -> {
            try {
                this.queue.put((MarketData)e);
            }
            catch (InterruptedException ex) {
                ex.printStackTrace();
            }
        });
        reader.start();
    }

    private void stop() {
        this.keepRunning = false;
        this.outputController.stop();
    }
}


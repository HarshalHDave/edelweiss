/*
 * Decompiled with CFR 0.152.
 */
package hackathon.player;

import hackathon.player.OutputController;
import hackathon.player.model.MarketData;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class TCPControllerImpl
implements OutputController<MarketData> {
    private final List<Socket> clients = new LinkedList<Socket>();
    private final double speedUp;
    private final boolean debug;
    private final ServerSocket serverSocket;
    private final Map<String, MarketData> lastPublishedDataCache = new ConcurrentHashMap<String, MarketData>();
    private volatile boolean keepListening = true;
    private MarketData lastPublished = null;
    private long lastPublishedTime = new Date().getTime();

    public TCPControllerImpl(int port, double speedUp) throws IOException {
        this.speedUp = speedUp;
        String debugStr = System.getProperties().getProperty("debug");
        this.debug = debugStr != null && debugStr.trim().equalsIgnoreCase("true");
        this.serverSocket = new ServerSocket(port);
        ExecutorService executorService = Executors.newSingleThreadExecutor();
        executorService.submit(() -> {
            while (this.keepListening) {
                try {
                    Socket client = this.serverSocket.accept();
                    client.getInputStream().read(new byte[1]);
                    System.out.println("Client added from " + client.getInetAddress());
                    this.publishCacheToNewClient(client);
                    this.clients.add(client);
                }
                catch (IOException iOException) {}
            }
        });
    }

    private void publishCacheToNewClient(Socket client) {
        for (MarketData marketData : this.lastPublishedDataCache.values()) {
            try {
                client.getOutputStream().write(marketData.toBytes());
            }
            catch (Exception e) {
                System.err.println("Error publishing market data [" + marketData + "] to client [" + client + "]");
            }
        }
        try {
            client.getOutputStream().flush();
        }
        catch (IOException iOException) {
            // empty catch block
        }
    }

    @Override
    public void receive(MarketData marketData) {
        LinkedList deadClients = new LinkedList();
        long expectedDelay = this.lastPublished != null ? marketData.getTimestamp().getTime() - this.lastPublished.getTimestamp().getTime() : 0L;
        do {
        } while ((double)expectedDelay > this.speedUp * (double)(new Date().getTime() - this.lastPublishedTime));
        marketData.markPublished();
        if (this.debug) {
            System.out.println("Publishing " + marketData);
        }
        this.clients.forEach(socket -> {
            try {
                socket.getOutputStream().write(marketData.toBytes());
            }
            catch (IOException e) {
                System.out.println("Client disconnected " + socket.getInetAddress());
                deadClients.add(socket);
            }
            catch (Exception e) {
                System.err.println("Some exception while publishing marketdata [" + marketData + "]");
            }
        });
        this.lastPublished = marketData;
        this.lastPublishedTime = new Date().getTime();
        this.lastPublishedDataCache.put(marketData.getSymbol(), marketData);
        if (!deadClients.isEmpty()) {
            this.clients.removeAll(deadClients);
        }
    }

    @Override
    public void stop() {
        this.keepListening = false;
        try {
            this.serverSocket.close();
        }
        catch (IOException iOException) {
            // empty catch block
        }
    }
}


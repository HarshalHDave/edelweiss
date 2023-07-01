/*
 * Decompiled with CFR 0.152.
 */
package hackathon.player.model;

import hackathon.player.ByteUtils;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.Date;
import java.util.concurrent.atomic.AtomicLong;

public class MarketData {
    private static final AtomicLong _sequence = new AtomicLong(0L);
    private final String symbol;
    private final long LTP;
    private final long LTQ;
    private final long totalTradedVolume;
    private final long bestBid;
    private final long bestAsk;
    private final long bestBidQty;
    private final long bestAskQty;
    private final long openInterest;
    private final Date timestamp;
    private final long sequence;
    private final long prevClosePrice;
    private final long prevOpenInterest;
    private Date lastPublishedTimestamp = null;

    public MarketData(String symbol, long ltp, long ltq, long totalTradedVolume, long bestBid, long bestAsk, long bestBidQty, long bestAskQty, long openInterest, Date timestamp, long prevClosePrice, long prevOpenInterest) {
        this.symbol = symbol;
        this.LTP = ltp;
        this.LTQ = ltq;
        this.totalTradedVolume = totalTradedVolume;
        this.bestBid = bestBid;
        this.bestAsk = bestAsk;
        this.bestBidQty = bestBidQty;
        this.bestAskQty = bestAskQty;
        this.openInterest = openInterest;
        this.timestamp = timestamp;
        this.prevClosePrice = prevClosePrice;
        this.prevOpenInterest = prevOpenInterest;
        this.sequence = _sequence.incrementAndGet();
    }

    public MarketData(String symbol, long ltp, long ltq, long totalTradedVolume, long bestBid, long bestAsk, long bestBidQty, long bestAskQty, long openInterest, Date timestamp, long prevClosePrice, long prevOpenInterest, long sequence) {
        this.symbol = symbol;
        this.LTP = ltp;
        this.LTQ = ltq;
        this.totalTradedVolume = totalTradedVolume;
        this.bestBid = bestBid;
        this.bestAsk = bestAsk;
        this.bestBidQty = bestBidQty;
        this.bestAskQty = bestAskQty;
        this.openInterest = openInterest;
        this.timestamp = timestamp;
        this.prevClosePrice = prevClosePrice;
        this.prevOpenInterest = prevOpenInterest;
        this.sequence = sequence;
    }

    public String getSymbol() {
        return this.symbol;
    }

    public String toString() {
        return "MarketData{symbol='" + this.symbol + "', LTP=" + this.LTP + ", LTQ=" + this.LTQ + ", totalTradedVolume=" + this.totalTradedVolume + ", bestBid=" + this.bestBid + ", bestAsk=" + this.bestAsk + ", bestBidQty=" + this.bestBidQty + ", bestAskQty=" + this.bestAskQty + ", openInterest=" + this.openInterest + ", timestamp=" + (this.lastPublishedTimestamp != null ? this.lastPublishedTimestamp : this.timestamp) + ", sequence=" + this.sequence + ", prevClosePrice=" + this.prevClosePrice + ", prevOpenInterest=" + this.prevOpenInterest + "}";
    }

    public void markPublished() {
        this.lastPublishedTimestamp = new Date();
    }

    public byte[] toBytes() {
        ByteBuffer byteBuffer = ByteBuffer.allocate(130).order(ByteOrder.LITTLE_ENDIAN);
        byteBuffer.putInt(124);
        byteBuffer.put(ByteUtils.charsToSinglePaddedByteArray(this.symbol.toCharArray(), 30));
        byteBuffer.putLong(this.sequence);
        byteBuffer.putLong(this.lastPublishedTimestamp.getTime());
        byteBuffer.putLong(this.LTP);
        byteBuffer.putLong(this.LTQ);
        byteBuffer.putLong(this.totalTradedVolume);
        byteBuffer.putLong(this.bestBid);
        byteBuffer.putLong(this.bestBidQty);
        byteBuffer.putLong(this.bestAsk);
        byteBuffer.putLong(this.bestAskQty);
        byteBuffer.putLong(this.openInterest);
        byteBuffer.putLong(this.prevClosePrice);
        byteBuffer.putLong(this.prevOpenInterest);
        return byteBuffer.array();
    }

    public Date getTimestamp() {
        return this.timestamp;
    }

    public long getLTP() {
        return this.LTP;
    }

    public long getLTQ() {
        return this.LTQ;
    }

    public long getTotalTradedVolume() {
        return this.totalTradedVolume;
    }

    public long getBestBid() {
        return this.bestBid;
    }

    public long getBestAsk() {
        return this.bestAsk;
    }

    public long getBestBidQty() {
        return this.bestBidQty;
    }

    public long getBestAskQty() {
        return this.bestAskQty;
    }

    public long getOpenInterest() {
        return this.openInterest;
    }

    public long getSequence() {
        return this.sequence;
    }

    public long getPrevClosePrice() {
        return this.prevClosePrice;
    }

    public long getPrevOpenInterest() {
        return this.prevOpenInterest;
    }

    public Date getLastPublishedTimestamp() {
        return this.lastPublishedTimestamp;
    }
}

